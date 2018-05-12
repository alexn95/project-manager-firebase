import { ProjectService } from './project.service';
import { Project } from './../../models/entries/project';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

    private initProjectSub: Subscription;
    public loading: boolean;

    constructor(
        private service: ProjectService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.initProjectSub = this.route.params.subscribe(params => {
            this.service.initProject(params['id']).then(() => {
                this.loading = false;
            });
        });
    }

    ngOnDestroy() {
        this.initProjectSub.unsubscribe();
    }

}


