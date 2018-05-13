import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { functions } from '../../environments/const-variables/functions';
import { Issue } from '../../models/entries/issue';




@Injectable()
export class DataIssuesService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase,
        private auth: AuthService,
        private http: Http,
    ) { }

    public saveIssues(summary: string, description: string, state: number): Promise<any> {
        const data: Issue = {
            id: null,
            number: 1,
            create_date : String(new Date()),
            description : description,
            summary : summary,
            author_id: this.auth.getUID,
            priority: 'normal',
            type: 'task',
            state: state,
            assigne_user_id: null,
            project_id: '-LBQWhEeuVEc_l0IFAs6',
            sprint_id: '1',
            days: null,
            comments: []
        };
        const ref = this.db.ref('issues/' + data.project_id);
        const postRef = ref.push();
        data.id = postRef.key;
        return postRef.set(data);
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
