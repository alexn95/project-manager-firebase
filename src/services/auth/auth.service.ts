import { snackBarMsgs } from './../../environments/const-variables/snack-bar-msgs';
import { routingUrl } from './../../environments/const-variables/routing-url';
import { Observable } from 'rxjs/Observable';
import { SnackBarService } from './../snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { AuthEvents } from './auth-events';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs/ReplaySubject';



@Injectable()
export class AuthService {

    private db: firebase.database.Database = firebase.database();
    private authEvents: ReplaySubject<AuthEvents> = new ReplaySubject(1);
    private user: firebase.User;

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
                    this.authEvents.next(AuthEvents.AUTHENTICATED);
                } else {
                    console.log('%cuser is not set', 'color:darkred');
                    this.authEvents.next(AuthEvents.NOT_AUTHENTICATED);
                }
            }
        );
    }

    get getAuthEvents(): ReplaySubject<AuthEvents> {
        return this.authEvents;
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

    public signup(email: string, password: string, firstName: string, secondName: string): Observable<void> {
        return new Observable(observer => {
            this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                this.createUser(result.uid, email, firstName, secondName).then( () => {
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

    private createUser(id: string, email: string, firstName: string, secondName: string): Promise<any> {
        const ref = this.db.ref('users/' + id);
        return ref.set({
            id: id,
            email: email,
            firstName: firstName,
            secondName: secondName,
        });
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

}
