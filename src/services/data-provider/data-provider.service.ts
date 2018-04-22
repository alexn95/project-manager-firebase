import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { functions } from '../../environments/const-variables';
import { Project } from '../../models/entries/project';


@Injectable()
export class DataProviderService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase,
        private http: Http,
    ) { }

    public writeCurrentDate(): void {
        this.db.ref('date').set(String(new Date()));
    }

    public searchProjects(): Observable<Project[]> {
        const params = {
            id: '1',
            title: 'proj1'
        };
        return new Observable(observer => {
            this.http.post(functions.searchProjects, params)
            .map((res) => res.json())
            .subscribe((projects) => {
                if (projects) {
                    const result = Object.keys(projects).map(key => projects[key]);
                    console.log(result);
                    observer.next(result);
                } else {
                    observer.next([]);
                }
            });
        });
    }

    public saveProject(): Observable<void> {
        const data = {
            create_date : 'date',
            description : 'desc',
            state : 'open',
            title : 'proj1'
        };
        return new Observable(observer => {
            const ref = this.db.ref('projects');
            const key = ref.push(data).key;
            ref.child(key + '/id').set(key);
            observer.next();
        });
    }

}
