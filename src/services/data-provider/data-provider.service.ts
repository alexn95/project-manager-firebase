import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DataProviderService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase
    ) { }

    public writeDate(): void {
        this.fireDataBase.database.ref('data').set(String(new Date()));
        // this.db.ref('data').set(String(new Date()));
    }

}
