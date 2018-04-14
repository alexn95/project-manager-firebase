import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        public fireAuth: AngularFireAuth
    ) { }

    public login(email: string, password: string): void {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password)
            .catch((error: Error) => {
                console.log(error);
            });
    }

    public signup(email: string, password: string): void {
        this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .catch((error: Error) => {
                console.log(error);
            });
    }

}
