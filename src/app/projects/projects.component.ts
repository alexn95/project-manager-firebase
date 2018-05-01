import { routingUrl } from './../../environments/const-variables/routing-url';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { User } from 'firebase/app';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../models/entries/project';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {

    public projects: Project[];
    private searchSub: Subscription;

    constructor(
        private dataProvider: DataProjectsService,
    ) {
        this.searchSub = dataProvider.searchProjects().subscribe(projects => {
            this.projects = projects;
        });
        dataProvider.saveProject().then();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }

}
