import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { User } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/entries/project';



@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

    public projects: Project[];

    constructor(
        public dataProvider: DataProviderService
    ) {
        dataProvider.searchProjects().subscribe(projects => {
            this.projects = projects;
        });
        // dataProvider.saveProject().subscribe();
    }

    ngOnInit() {
    }

}
