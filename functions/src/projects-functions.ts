import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
export class ProjectsFunctions {

    constructor(private db: firebase.database.Database) {}
    
    public searchProjects(params: {}): Observable<any> {
        console.log(params)
        return new Observable(observer => {
            this.db.ref('/projects')
            .once('value')
            .then((projects) =>
                {
                    observer.next(projects);
                }
            )
            .catch((error: Error) => observer.error(error))
        })    
    }

}