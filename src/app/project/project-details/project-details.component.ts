import { snackBarMsgs } from './../../../environments/const-variables/snack-bar-msgs';
import { accessTypes } from './../../../environments/const-variables/access-types';
import { ProjectService } from './../project.service';
import { SnackBarService } from './../../../services/snack-bar/snack-bar.service';
import { Project } from './../../../models/entries/project';
import { DataProjectsService } from './../../../services/data-provider/data-projects.service';
import { FormErrorStateMatcher } from './../../../models/form-error-state-matcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


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
    public access: FormControl;

    public accessTypes = accessTypes;

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
        this.access = new FormControl(this.project.access, []);
        this.projectForm = new FormGroup({
            title: this.title,
            description: this.description,
            access: this.access
        });
    }


    public isChangeExist(): boolean {
        return  this.project.title !== this.title.value ||
                this.project.description !== this.description.value ||
                this.project.access !== this.access.value;
    }

    public updateProject(): void {
        this.project.title = this.title.value;
        this.project.description = this.description.value;
        this.project.access = this.access.value;
        this.dataProvider.updateProject(this.project).subscribe(() =>  this.snackNar.open(snackBarMsgs.updateProjectSuccess));
    }

    public cancel(): void {
        this.title.setValue(this.project.title);
        this.description.setValue(this.project.description);
        this.access.setValue(this.project.access);
    }


}
