import { snackBarMsgs } from './../../../environments/const-variables/snack-bar-msgs';
import { ProjectService } from './../project.service';
import { SnackBarService } from './../../../services/snack-bar/snack-bar.service';
import { Project } from './../../../models/entries/project';
import { DataProjectsService } from './../../../services/data-provider/data-projects.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormErrorStateMatcher } from '../../../services/validators/form-error-state-matcher';


@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

    private projectSetSub: Subscription;
    public project: Project;

    public errorMatcher = new FormErrorStateMatcher();
    public projectForm: FormGroup;
    public title: FormControl;
    public description: FormControl;
    public code: FormControl;


    constructor(
        private route: ActivatedRoute,
        private dataProvider: DataProjectsService,
        private snackNar: SnackBarService,
        private service: ProjectService,
    ) {
    }

    ngOnInit() {
        this.projectSetSub = this.service.projectSet.subscribe((project: Project) => {
            this.project = project;
            this.initProjectForm();
        });
        const currentProject = this.service.getProject;
        if (currentProject) {
            this.project = currentProject;
            this.initProjectForm();
        }
    }

    ngOnDestroy() {
        this.projectSetSub.unsubscribe();
    }

    private initProjectForm(): void {
        this.title = new FormControl(this.project.title, [
            Validators.required,
            Validators.maxLength(100)
        ]);
        this.description = new FormControl(this.project.description, [
            Validators.maxLength(1000)
        ]);
        this.code = new FormControl(this.project.code, [
            Validators.required,
            Validators.maxLength(20)
        ]);
        this.projectForm = new FormGroup({
            title: this.title,
            description: this.description,
            code: this.code
        });
    }


    public isChangeExist(): boolean {
        return  this.project.title !== this.title.value ||
                this.project.description !== this.description.value ||
                this.project.code !== this.code.value;
    }

    public updateProject(): void {
        this.project.title = this.title.value;
        this.project.description = this.description.value;
        this.project.code = this.code.value;
        this.dataProvider.updateProject(this.project).then(() =>  this.snackNar.open(snackBarMsgs.updateProjectSuccess));
    }

    public cancel(): void {
        this.title.setValue(this.project.title);
        this.description.setValue(this.project.description);
        this.code.setValue(this.project.code);
    }


}
