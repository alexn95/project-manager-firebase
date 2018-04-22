import { DataProviderService } from './../../services/data-provider/data-provider.service';
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
        private dataProvider: DataProviderService,
    ) {
        this.searchSub = dataProvider.searchProjects().subscribe(projects => {
            this.projects = projects;
        });
        // dataProvider.saveProject().subscribe();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }

}
