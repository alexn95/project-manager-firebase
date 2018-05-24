import { UserRole } from './../../models/entries/user-role';
import { DataUsersService } from './data-users.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Project } from '../../models/entries/project';
import { User } from '../../models/entries/user';



@Injectable()
export class DataProviderService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase,
        private http: Http,
        private userService: DataUsersService,
    ) { }

    public saveProjectUser(projectId: string, userId: string, role: number): Promise<any> {
        const ref = this.db.ref('projects_users').child(projectId).child(userId);
        return ref.set({
            user_id: userId,
            role: role
        });
    }

    public getProjectUsersRole(projectId: string): Promise<UserRole[]> {
        const ref = this.db.ref('projects_users').child(projectId);
        return ref.once('value').then((result) => {
            const projectUsers = result.val();
            return Object.keys(projectUsers).map(key => projectUsers[key]);
        });
    }

    public getProjectUsers(projectId: string): Observable<User[]> {
        return new Observable((observer) => {
            this.getProjectUsersRole(projectId).then((projectUsers) => {
                console.log(projectUsers);
                this.getUsersAtProject(projectUsers).subscribe((users) => {
                    observer.next(users);
                });
            });
        });
    }

    public getUsersAtProject(projectUsers: UserRole[]): Observable<User[]> {
        return Observable.of(projectUsers).mergeMap(users => {
            return Observable.forkJoin(
                users.map((projectUser: UserRole) =>
                    this.userService.getUserById(projectUser.user_id).then(user => {
                        return user;
                    })
                )
            );
        });
    }

    public getProjectUserRole(projectId: string, userId: string): Promise<UserRole> {
        const ref = this.db.ref('projects_users').child(projectId).child(userId);
        return ref.once('value').then((result) => {
            return result.val();
        });
    }

}
