import { functions } from './../../models/const-variables/functions';
import { DataProviderService } from './data-provider.service';
import { UserRole } from './../../models/entries/user-role';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Project } from '../../models/entries/project';
import { projectRoles } from '../../models/const-variables/project-roles';
import { errorMessages } from '../../models/const-variables/error-messages';



@Injectable()
export class DataProjectsService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase,
        private auth: AuthService,
        private http: Http,
        private dataService: DataProviderService
    ) { }


    public searchProjects(params: string): Observable<Project[]> {
        return new Observable(observer => {
            this.db.ref('/projects')
            .once('value')
            .then((res) => {
                const val = res.val();
                let projects = val ? Object.keys(val).map(key => val[key]) : [];
                if (params) {
                    projects = projects.filter(project =>
                        project.code.includes(params) ||
                        project.title.includes(params)
                    );
                }
                observer.next(projects);
            })
            .catch((error: Error) => observer.error(error));
        });
    }

    public searchProjectsCF(params: string): Observable<Project[]> {
        return this.http.post(functions.searchProjects, params)
        .map((res) => {
            const json = res.json();
            return json;
        });
    }

    public saveProject(title: string, description: string, code: string): Promise<any> {
        const data: Project = {
            id: '',
            code: code,
            create_date: Date.now(),
            description : description,
            title : title,
            issues_count : 12
        };
        const ref = this.db.ref('projects');
        const postRef = ref.push();
        data.id = postRef.key;
        return postRef.set(data).then( () => {
            return this.dataService.saveProjectUser(data.id, this.auth.getUID, projectRoles.creator);
        });
    }

    public updateProject(project: Project): Promise<any> {
        const ref = this.db.ref('projects').child(project.id);
        return ref.update(project);
    }

    public getProjectById(id: string): Promise<Project> {
        const ref = this.db.ref('projects').child(id);
        return ref.once('value').then((project) => {
            if (!project.val()) {
                throw new Error(errorMessages.projectNotFoundError);
            }
            return project.val();
        });
    }

    public deleteProject(id: string): Promise<any> {
        const ref = this.db.ref('projects/' + id);
        return ref.remove();
    }

    public changeUserRole(userId: string, projectId: string, role: number): Promise<any> {
        const ref = this.db.ref('projects_users').child(projectId).child(userId);
        return ref.update({
            role: role
        });
    }

    public joinUser(userId: string, projectId: string): Promise<any> {
        const ref = this.db.ref('projects/' + projectId + '/users/' + userId);
        return ref.set({
            role: 2,
            user_id: userId
        });
    }

}
