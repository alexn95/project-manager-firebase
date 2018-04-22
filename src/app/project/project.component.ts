import { Observable } from 'rxjs/Observable';
import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { Project } from './../../../functions/src/models/project';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    public project: Project;

    constructor(
        private route: ActivatedRoute,
        private dataProvider: DataProviderService,
    ) {
        this.sub = this.route.params.subscribe(params => {
            dataProvider.getProjectById(params['id'])
            .subscribe((project: Project) => {
                if (!project) {
                    console.log(project);
                }
                this.project = project;
            });
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
