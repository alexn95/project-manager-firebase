import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Http } from '@angular/http';
import { functions } from '../../environments/const-variables/functions';
import { Project } from '../../models/entries/project';



@Injectable()
export class DataProjectsService {

    private db: firebase.database.Database = firebase.database();

    constructor(
        private fireDataBase: AngularFireDatabase,
        private http: Http,
    ) { }


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

    public saveProject(): Promise<any> {
        const data = {
            create_date : String(new Date()),
            description : 'description',
            state : 'open',
            title : 'Project 1',
            access : 'public',
            id: '',
        };
        const ref = this.db.ref('projects');
        const postRef = ref.push();
        data.id = postRef.key;
        return postRef.set(data);
    }

    public updateProject(project: Project): Promise<any> {
        const ref = this.db.ref('projects/' + project.id);
        return ref.update(project);
    }

    public getProjectById(id: string): Promise<Project> {
        const ref = this.db.ref('projects/' + id);
        return ref.once('value').then((project) => {
            return project.val();
        });
    }

    public deleteProject(id: string): Promise<any> {
        const ref = this.db.ref('projects/' + id);
        return ref.remove();
    }

}
