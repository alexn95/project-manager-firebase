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


    public searchProjects(text: string): Observable<Project[]> {
        return new Observable(observer => {
            this.auth.updateUserData().then(() => {
                this.getProjects(text).then((projects) => {
                    if (projects.length > 0) {
                        this.getProjectsWithRole(projects).subscribe((prsRole) => {
                            observer.next(prsRole);
                        });
                    } else {
                        observer.next([]);
                    }
                });
            });
        });
    }

    private getProjectsWithRole(projects: Project[]): Observable<Project[]> {
        const ref = this.db.ref('/projects_users');
        return Observable.of(projects)
        .mergeMap(prs => {
            return Observable.forkJoin(
                prs.map(pr => {
                    return Observable.fromPromise(ref.child(pr.id).child(AuthService.CURRENT_USER_ID)
                        .once('value').then((role) => {
                            const val = role.val();
                            pr.isInvite = val === null;
                            return pr;
                        })
                    );
                })
            );
        });
    }


    private getProjects(text: string): Promise<Project[]> {
        const projectsId = this.auth.getUserProjectsId();
        const ref = this.db.ref('/projects');
        const projectsRef =  projectsId.map(id =>
            ref.child(id).once('value', project => project)
        );
        return Promise.all(projectsRef).then((result) => {
            const val = result.map(res => res.val());
            let projects = val ? Object.keys(val).map(key => val[key]) : [];
            projects = this.filterProjects(projects, text);
            return projects;
        });
    }

    private filterProjects(projects: Project[], text: string): Project[] {
        if (text) {
            projects = projects.filter(project =>
                project.code.toLowerCase().includes(text.toLowerCase()) ||
                project.title.toLowerCase().includes(text.toLowerCase())
            );
        }
        return projects;
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
            issues_count : 0
        };
        const ref = this.db.ref('projects');
        const postRef = ref.push();
        data.id = postRef.key;
        return postRef.set(data).then( () => {
            return this.dataService.saveProjectUser(data.id, this.auth.getUID, projectRoles.creator).then( () => {
                return this.dataService.addProjectToUserProject(data.id, this.auth.getUID);
            });
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
        return ref.remove().then(() => {
            return this.deleteProjectUsers(id).subscribe(() => {
                return this.deleteProjectIssue(id);
            });
        });
    }

    public deleteProjectIssue(projectId: string): Promise<any> {
        const ref = this.db.ref('issues').child(projectId);
        return ref.remove();
    }


    public deleteProjectUsers(projectId: string): Observable<null> {
        const refPU = this.db.ref('projects_users/' + projectId);
        return new Observable(observer => {
            this.dataService.getProjectUsersRole(projectId).then((getProjectUsersRole) => {
                this.deleteProjectIdFormUsers(projectId, getProjectUsersRole).subscribe(() => {
                    refPU.remove().then(() => observer.next());
                });
            });
        });
    }

    private deleteProjectIdFormUsers(projectId: string, usersRole: UserRole[]): Observable<any[]> {
        const refU = this.db.ref('users');
        return Observable.of(usersRole)
        .mergeMap(usersRoleMap => {
            return Observable.forkJoin(
                usersRoleMap.map(user => {
                    return Observable.fromPromise(
                        refU.child(user.user_id).child('projects').child(projectId).remove()
                    );
                })
            );
        });

    }

    public leaveProject(projectId: string, userId: string): Promise<any> {
        const refU = this.db.ref('users/' + userId).child('projects').child(projectId);
        const refPU = this.db.ref('projects_users/' + projectId).child(userId);
        return refU.remove().then(() => refPU.remove());
    }

    public changeUserRole(userId: string, projectId: string, role: number): Promise<any> {
        const ref = this.db.ref('projects_users').child(projectId).child(userId);
        return ref.update({
            role: role
        });
    }

}
