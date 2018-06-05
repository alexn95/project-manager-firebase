import { Comment } from './../../models/entries/comment';
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
        const refI = this.db.ref('issues/' + issue.project_id);
        const refP = this.db.ref('projects/' + issue.project_id).child('issues_count');
        return refP.once('value').then((res) => {
            let count = res.val();
            issue.number = ++count;
            issue.create_date = Date.now();
            issue.author_id = this.auth.getUID;
            const postRef = refI.push();
            issue.id = postRef.key;
            refP.set(count);
            return postRef.set(issue);
        });
    }

    public updateIssues(issue: Issue): Promise<any> {
        issue.update_date = Date.now();
        issue.update_user_id = this.auth.getUID;
        const ref = this.db.ref('issues/' + issue.project_id).child(issue.id);
        return ref.update(issue);
    }

    public addComment(content: string, issueId: string): Promise<Comment> {
        const comment = new Comment();
        comment.content = content;
        comment.create_date = Date.now();
        comment.author_id = AuthService.CURRENT_USER_ID;
        const ref = this.db.ref('comments').child(issueId);
        const postRef = ref.push();
        comment.id = postRef.key;
        return postRef.set(comment).then(() => {
            return comment;
        });
    }

    public getIssueComments(issueId: string): Promise<any> {
        const ref = this.db.ref('comments/' + issueId);
        return ref.once('value').then((res) => {
            const json = res.val();
            return json ? Object.keys(json).map(key => json[key]) : [];
        });
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

    public deleteIssue(issue: Issue): Promise<any> {
        const refI = this.db.ref('issues/' + issue.project_id).child(issue.id);
        const refP = this.db.ref('projects/' + issue.project_id).child('issues_count');
        return refP.once('value').then((res) => {
            const count = res.val();
            refP.set(count !== 0 ? count - 1 : 0);
            return refI.remove();
        });
    }

}
