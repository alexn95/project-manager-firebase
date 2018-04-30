import { Content } from './../../environments/const-variables/content';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { Project } from './../../models/entries/project';
import { Injectable, EventEmitter } from '@angular/core';



@Injectable()
export class ProjectService {

    private project: Project;
    public projectSet: EventEmitter<Project>;
    public contentChange: EventEmitter<Content>;

    constructor(
        private dataProvider: DataProjectsService,
    ) {
        this.projectSet = new EventEmitter<Project>();
        this.contentChange = new EventEmitter<Content>();
    }


    get getProject(): Project {
        return this.project;
    }

    set setProject(project: Project) {
        this.project = project;
    }

    public initProject(id: string): void {
        this.dataProvider.getProjectById(id)
        .subscribe((project: Project) => {
            this.project = project;
            this.projectSet.emit(project);
        });
    }

    public showUsers(): void {
        this.contentChange.emit(Content.users);
    }

    public showDetails(): void {
        this.contentChange.emit(Content.details);
    }

}
