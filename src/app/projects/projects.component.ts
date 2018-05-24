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

    private searchSub: Subscription;

    constructor(
        private dataProvider: DataProjectsService,
    ) {
        this.searchSub = dataProvider.searchProjects().subscribe(projects => {
            this.projects = projects;
        });
        // dataProvider.saveProject('Project 1', 'description').then();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }


}
