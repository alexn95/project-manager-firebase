import { Observable } from 'rxjs/Observable';
import { SnackBarService } from './../snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { AuthEvents } from './auth-events';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { variables, routingUrl } from '../../environments/const-variables';
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

    public login(email: string, password: string): void {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                this.user = user;
                this.authEvents.next(AuthEvents.AUTHENTICATED);
                this.snackBar.open(variables.snackBar.login.success);
            })
            .catch((error: Error) => {
                this.authEvents.next(AuthEvents.AUTH_ERROR);
                this.snackBar.open(variables.snackBar.login.incorrectData);
            });
        this.fireAuth.auth.getRedirectResult()
            .then(result => {
                this.router.navigateByUrl(routingUrl.projects);
            })
            .catch((error: Error) => {
                this.authEvents.next(AuthEvents.AUTH_ERROR);
                this.snackBar.open(variables.snackBar.login.incorrectData);
            });
    }

    public signup(email: string, password: string): void {
        this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                this.snackBar.open(variables.snackBar.signup.success);
                this.router.navigateByUrl(routingUrl.loginPage);
            })
            .catch((error: Error) => {
                this.snackBar.openMsg(error.message, variables.snackBar.default);
            });
    }

    public logout(): void {
        this.fireAuth.auth.signOut()
            .then(() => {
                this.authEvents.next(AuthEvents.LOGOUT);
                this.router.navigateByUrl(routingUrl.loginPage);
            })
            .catch((error: Error) => {
                this.snackBar.openMsg(error.message, variables.snackBar.default);
                this.authEvents.next(AuthEvents.AUTH_ERROR);
                this.router.navigateByUrl(routingUrl.loginPage);
            });
    }

}
