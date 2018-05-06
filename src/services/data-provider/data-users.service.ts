import { functions } from './../../environments/const-variables/functions';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from '../../models/entries/user';
import { Invite } from '../../models/entries/invite';

@Injectable()
export class DataUsersService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private http: Http,
    ) {}

    public getUserById(id: string): Promise<User> {
        return this.db.ref('users/' + id).once('value').then(user => user.val());
    }

    public inviteToProject(userId: string, projectId: string): Promise<any> {
        const invite: Invite = { project_id: projectId };
        return this.db.ref('users/' + userId + '/invites/' + projectId).set(invite);
    }

    public getUserByEmail(email: string): Observable<User> {
        return this.http.post(functions.getUserByEmail, email)
            .map((res) => {
                const json = res.json();
                return json ? Object.keys(json).map(key => json[key])[0] : json;
            });
    }


}
