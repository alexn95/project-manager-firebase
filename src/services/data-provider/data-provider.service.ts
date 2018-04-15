import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

@Injectable()
export class DataProviderService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase
    ) { }

    public writeCurrentDate(): void {
        this.db.ref('date').set(String(new Date()));
    }

}
