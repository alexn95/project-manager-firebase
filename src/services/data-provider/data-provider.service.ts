import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { functions } from '../../environments/const-variables';

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

    public searchProjects(): void {
        this.http.get(functions.searchProjects).subscribe((response) => {
            console.log(response.json());
        });
    }

}
