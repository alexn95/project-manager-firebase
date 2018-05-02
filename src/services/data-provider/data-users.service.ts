import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from '../../models/entries/user';

@Injectable()
export class DataUsersService {

    private db: firebase.database.Database = firebase.database();

    constructor() {}

    public getUserById(id: string): Promise<User> {
        return this.db.ref('users/' + id).once('value').then(user => user.val());
    }


}
