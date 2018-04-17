import { SnackBarService } from './../snack-bar/snack-bar.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthEvents } from './auth-events';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { variables } from '../../environments/const-variables';



@Injectable()
export class AuthService {

    private db: firebase.database.Database = firebase.database();
    private authEvents: EventEmitter<AuthEvents> = new EventEmitter();
    private user: firebase.User;

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router,
        private snackBar: SnackBarService
    ) {
        fireAuth.authState.subscribe(
            user => {
                if (user) {
                    console.log('%cuser is set to %o', 'color:darkgreen', user);
                    this.user = user;
                    this.authEvents.emit(AuthEvents.AUTHENTICATED);
                } else {
                    console.log('%cuser is not set', 'color:darkred');
                    this.authEvents.emit(AuthEvents.NOT_AUTHENTICATED);
                }
            }
        );
    }

    get getAuthEvents(): EventEmitter<AuthEvents> {
        return this.authEvents;
    }

    get getUser(): firebase.User {
        return this.user;
    }

    public login(email: string, password: string): void {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                this.user = user;
                this.authEvents.emit(AuthEvents.AUTHENTICATED);
                this.snackBar.open(variables.snackBar.login.success);
            })
            .catch((error: Error) => {
                this.authEvents.emit(AuthEvents.AUTH_ERROR);
                this.snackBar.open(variables.snackBar.login.incorrectData);
            });
        this.fireAuth.auth.getRedirectResult()
            .then(result => {
                this.router.navigateByUrl(environment.routing.toolbar);
            })
            .catch((error: Error) => {
                this.authEvents.emit(AuthEvents.AUTH_ERROR);
                this.snackBar.open(variables.snackBar.login.incorrectData);
            });
    }

    public signup(email: string, password: string): void {
        this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                this.snackBar.open(variables.snackBar.signup.success);
                this.router.navigateByUrl(environment.routing.loginPage);
            })
            .catch((error: Error) => {
                this.snackBar.openMsg(error.message, variables.snackBar.default);
            });
    }

    public logout(): void {
        this.fireAuth.auth.signOut()
            .then(() => {
                this.authEvents.emit(AuthEvents.LOGOUT);
                this.router.navigateByUrl(environment.routing.loginPage);
            })
            .catch((error: Error) => {
                this.snackBar.openMsg(error.message, variables.snackBar.default);
                this.authEvents.emit(AuthEvents.AUTH_ERROR);
                this.router.navigateByUrl(environment.routing.loginPage);
            });
    }

}
