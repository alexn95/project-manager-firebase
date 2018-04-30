import { ProjectService } from './project.service';
import { Project } from './../../models/entries/project';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Content } from '../../environments/const-variables/content';


@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

    private initProjectSub: Subscription;
    private contentSub: Subscription;
    public content: Content;

    constructor(
        private service: ProjectService,
        private route: ActivatedRoute,
    ) {
        this.content = Content.details;
    }

    ngOnInit() {
        this.initProjectSub = this.route.params.subscribe(params => {
            this.service.initProject(params['id']);
        });
        this.contentSub = this.service.contentChange.subscribe(content => {
            this.content = content;
        });

    }

    ngOnDestroy() {
        this.initProjectSub.unsubscribe();
        this.contentSub.unsubscribe();
    }

    public isShowDetails(): boolean {
        return this.content === Content.details;
    }

    public isShowUsers(): boolean {
        return this.content === Content.users;
    }

}


