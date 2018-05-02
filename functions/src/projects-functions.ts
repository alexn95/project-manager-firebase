import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
export class Functions {

    constructor(private db: firebase.database.Database) {}
    
    public searchProjects(params: {}): Observable<any> {
        console.log(params);
        return new Observable(observer => {
            this.db.ref('/projects')
            .once('value')
            .then((projects) => observer.next(projects))
            .catch((error: Error) => observer.error(error))
        });    
    }

    public getUserByEmail(email: string): Observable<any> {
        console.log(email);
        return new Observable(observer => {
            this.db.ref('users').orderByChild('email').equalTo(email).once('value')
                .then(user => observer.next(user))
                .catch((error: Error) => observer.error(error));
        });
    }

}