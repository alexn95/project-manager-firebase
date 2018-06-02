import { FormControl } from '@angular/forms';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { User } from 'firebase/app';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../models/entries/project';
import { Subscription } from 'rxjs/Subscription';
import { routingUrl } from '../../models/const-variables/routing-url';


@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {

    public projects: Project[];
    public projectsUrl = routingUrl.projects;
    public agileBoardsUrl = routingUrl.agileBoards;
    public searchProjects: FormControl;

    private searchSub$: Subscription;

    constructor(
        private dataProvider: DataProjectsService,
    ) {
        this.searchProjects = new FormControl();
        dataProvider.searchProjects(null).subscribe(projects => {
            this.projects = projects;
        });
        this.searchSub$ = this.searchProjects.valueChanges
        .debounceTime(800)
        .subscribe((text) => {
            dataProvider.searchProjects(text).subscribe(projects => {
                this.projects = projects;
            });
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.searchSub$.unsubscribe();
    }

    createProject(): void {

    }


}
