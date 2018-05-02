import { projectRoles } from './../../environments/const-variables/project-roles';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { functions } from '../../environments/const-variables/functions';
import { Project } from '../../models/entries/project';



@Injectable()
export class DataProjectsService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase,
        private auth: AuthService,
        private http: Http,
    ) { }


    public searchProjects(): Observable<Project[]> {
        const params = {
            id: '1',
            title: 'proj1'
        };
        return this.http.post(functions.searchProjects, params)
        .map((res) => {
            const json = res.json();
            return json ? Object.keys(json).map(key => json[key]) : [];
        });
    }

    public saveProject(title: string, description: string, access: string): Promise<any> {
        const data: Project = {
            id: '',
            create_date : String(new Date()),
            description : description,
            title : title,
            access : access,
            issues_count : 12,
            users: []
        };
        data.users[this.auth.getUID] = {
            user_id: this.auth.getUID,
            role: projectRoles.creator
        };
        const ref = this.db.ref('projects');
        const postRef = ref.push();
        data.id = postRef.key;
        return postRef.set(data);
    }

    public updateProject(project: Project): Promise<any> {
        const ref = this.db.ref('projects/' + project.id);
        return ref.update(project);
    }

    public getProjectById(id: string): Promise<Project> {
        const ref = this.db.ref('projects/' + id);
        return ref.once('value').then((project) => {
            return project.val();
        });
    }

    public deleteProject(id: string): Promise<any> {
        const ref = this.db.ref('projects/' + id);
        return ref.remove();
    }

    public changeUserRole(userId: string, projectId: string, role: number): Promise<any> {
        const ref = this.db.ref('projects/' + projectId + '/users/' + userId + '/role');
        return ref.set(role);
    }

    public joinUser(userId: string, projectId: string): Promise<any> {
        const ref = this.db.ref('projects/' + projectId + '/users/' + userId);
        return ref.set({
            role: 2,
            user_id: userId
        });
    }

}
