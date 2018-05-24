import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Issue } from '../../models/entries/issue';




@Injectable()
export class DataIssuesService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase,
        private auth: AuthService,
        private http: Http,
    ) { }

    public saveIssues(issue: Issue): Promise<any> {
        issue.number = 1;
        issue.create_date = Date.now();
        issue.author_id = this.auth.getUID;
        const ref = this.db.ref('issues/' + issue.project_id);
        const postRef = ref.push();
        issue.id = postRef.key;
        return postRef.set(issue);
    }

    public getAllIssues(): Promise<any> {
        const ref = this.db.ref('issues');
        return ref.once('value').then((res) => {
            const json = res.val();
            return json ? Object.keys(json).map(key => json[key]) : [];
        });
    }

    public getProjectIssues(projectId: string): Promise<any> {
        const ref = this.db.ref('issues/' + projectId);
        return ref.once('value').then((res) => {
            const json = res.val();
            return json ? Object.keys(json).map(key => json[key]) : [];
        });
    }

    public updateIssueState(issue: Issue): Promise<any> {
        const ref = this.db.ref('issues/' + issue.project_id + '/' + issue.id + '/state');
        return ref.set(issue.state);
    }

}
