import { Invite } from './../../models/entries/invite';
import { UserProject } from './../../models/entries/user-project';
import { ProjectUserData } from './../../app/project/project-users/user-project.model';
import { Observable } from 'rxjs/Observable';
import { SnackBarService } from './../snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { AuthEvents } from './auth-events';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from '../../models/entries/user';
import { routingUrl } from '../../models/const-variables/routing-url';
import { snackBarMsgs } from '../../models/const-variables/snack-bar-msgs';



@Injectable()
export class AuthService {

    public static CURRENT_USER_ID: string;

    private db: firebase.database.Database = firebase.database();
    private authEvents: ReplaySubject<AuthEvents> = new ReplaySubject(1);
    private user: firebase.User;
    private dbUser: User;
    private UID: string;

    get getUID(): string {
        return this.UID;
    }

    get getUser(): User {
        return this.dbUser;
    }

    get getUserProjectsData(): UserProject[] {
        const projects = this.dbUser.projects;
        return projects ? Object.keys(projects).map(key => projects[key]) : [];
    }

    get getUserInvites(): Invite[] {
        const projects = this.dbUser.invites;
        return projects ? Object.keys(projects).map(key => projects[key]) : [];
    }

    get getAuthEvents(): ReplaySubject<AuthEvents> {
        return this.authEvents;
    }

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router,
        private snackBar: SnackBarService
    ) {
        this.fireAuth.authState.subscribe(
            user => {
                if (user) {
                    console.log('%cuser is set to %o', 'color:darkgreen', user);
                    this.user = user;
                    this.UID = user.uid;
                    AuthService.CURRENT_USER_ID = user.uid;
                    this.getUserById(user.uid).then((dbUser: User) => {
                        this.dbUser = dbUser;
                        this.authEvents.next(AuthEvents.AUTHENTICATED);
                    });
                } else {
                    console.log('%cuser is not set', 'color:darkred');
                    this.authEvents.next(AuthEvents.NOT_AUTHENTICATED);
                }
            }
        );
    }

    public updateUserData(): Promise<any> {
        return this.getUserById(this.UID).then((dbUser: User) => {
            this.dbUser = dbUser;
            return;
        });
    }


    public getUserProjectsId(): string[] {
        const result = Array();
        this.getUserInvites.map(projectData => {
            result.push(projectData.project_id);
        });
        this.getUserProjectsData.map(projectData => {
            result.push(projectData.project_id);
        });
        return result;
    }


    public fetchUser(): Observable<firebase.User> {
        return new Observable(observer => {
            this.fireAuth.authState.subscribe(
                user => observer.next(user)
            );
        });
    }

    public login(email: string, password: string, persistence: firebase.auth.Auth.Persistence): void {
        firebase.auth().setPersistence(persistence)
            .then( () => {
                this.fireAuth.auth.signInWithEmailAndPassword(email, password)
                .then(user => {
                    this.user = user;
                    this.authEvents.next(AuthEvents.AUTHENTICATED);
                    this.router.navigateByUrl(routingUrl.projects);
                    this.snackBar.open(snackBarMsgs.login.success);
                })
                .catch((error: Error) => {
                    this.authEvents.next(AuthEvents.AUTH_ERROR);
                    this.snackBar.open(snackBarMsgs.login.incorrectData);
                });
            })
            .catch((error: Error) => {
                this.authEvents.next(AuthEvents.AUTH_ERROR);
                this.snackBar.openMsg(error.message, snackBarMsgs.default);
            });
    }

    public signup(email: string, password: string, firstName: string, lastName: string): Observable<void> {
        return new Observable(observer => {
            this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                this.createUser(result.uid, email, firstName, lastName).then( () => {
                    this.snackBar.open(snackBarMsgs.signup.success);
                    this.router.navigateByUrl(routingUrl.loginPage);
                    observer.next();
                });
            })
            .catch((error: Error) => {
                this.snackBar.openMsg(error.message, snackBarMsgs.default);
                observer.next();
            });
        });
    }

    private createUser(id: string, email: string, firstName: string, lastName: string): Promise<any> {
        const ref = this.db.ref('users/' + id);
        const user: User = {
            id: id,
            email: email,
            first_name: firstName,
            last_name: lastName
        };
        return ref.set(user);
    }

    public logout(): void {
        this.fireAuth.auth.signOut()
            .then(() => {
                this.authEvents.next(AuthEvents.LOGOUT);
                this.router.navigateByUrl(routingUrl.loginPage);
            })
            .catch((error: Error) => {
                this.snackBar.openMsg(error.message, snackBarMsgs.default);
                this.authEvents.next(AuthEvents.AUTH_ERROR);
                this.router.navigateByUrl(routingUrl.loginPage);
            });
    }

    private getUserById(id: string): Promise<User> {
        return this.db.ref('users/' + id).once('value').then(user => user.val());
    }

}
