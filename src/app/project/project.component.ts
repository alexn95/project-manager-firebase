import { Project } from './../../../functions/src/models/project';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    public project: Project;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            console.log(params['id']);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
