import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
export class Functions {

    constructor(private db: firebase.database.Database) {}
    
    public searchProjects(text: string): Observable<any> {
        return new Observable(observer => {
            this.db.ref('/projects')
            .once('value')
            .then((res) => {
                const val = res.val();
                let projects = val ? Object.keys(val).map(key => val[key]) : [];
                if (text) {
                    projects = projects.filter(project =>
                        project.code.includes(text) ||
                        project.title.includes(text)
                    );
                }
                observer.next(projects);
            })
            .catch((error: Error) => observer.error(error));
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