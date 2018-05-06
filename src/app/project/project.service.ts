import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { Project } from './../../models/entries/project';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class ProjectService {

    private project: Project;
    public projectSet: EventEmitter<Project>;

    constructor(
        private dataProvider: DataProjectsService,
    ) {
        this.projectSet = new EventEmitter<Project>();
    }

    get getProject(): Project {
        return this.project;
    }

    set setProject(project: Project) {
        this.project = project;
    }

    public initProject(id: string): void {
        this.dataProvider.getProjectById(id)
        .then((project: Project) => {
            this.project = project;
            this.projectSet.emit(project);
        });
    }

}
