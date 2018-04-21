import { Project } from './models/project';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
export class ProjectsFunctions {

    constructor(private db: firebase.database.Database) {}
    
    public searchProjects(): Observable<any> {
        return new Observable(observer => {
            this.db.ref('/projects')
            .once('value')
            .then((projects) =>
                {
                    observer.next(projects._body);
                }
            )
            .catch((error: Error) => observer.error(error))
        })    
    }

}