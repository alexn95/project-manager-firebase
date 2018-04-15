import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthEvents } from './auth-events';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable()
export class AuthService {

    private db: firebase.database.Database = firebase.database();
    private authEvents: EventEmitter<AuthEvents> = new EventEmitter();
    private user: firebase.User;

    constructor(
        public fireAuth: AngularFireAuth,
        public router: Router
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
            })
            .catch(error => {
                console.error('%Login ERROR\n%o', 'color:white;background-color:magenta', error);
                this.authEvents.emit(AuthEvents.AUTH_ERROR);
            });
        this.fireAuth.auth.getRedirectResult()
            .then(result => {
                this.router.navigateByUrl(environment.routing.toolbar);
            })
            .catch(error => {
                console.error('%Login ERROR\n%o', 'color:white;background-color:magenta', error);
                this.authEvents.emit(AuthEvents.AUTH_ERROR);
            });
    }

    public signup(email: string, password: string): void {
        this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    public logout(): void {
        this.fireAuth.auth.signOut()
            .then(() => {
                this.authEvents.emit(AuthEvents.LOGOUT);
                this.router.navigateByUrl(environment.routing.loginPage);
            })
            .catch(error => {
                console.log(error);
                this.authEvents.emit(AuthEvents.AUTH_ERROR);
                this.router.navigateByUrl(environment.routing.loginPage);
            });
    }

}
