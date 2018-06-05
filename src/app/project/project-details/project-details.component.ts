import { projectRoles } from './../../../models/const-variables/project-roles';
import { ProjectService } from './../project.service';
import { SnackBarService } from './../../../services/snack-bar/snack-bar.service';
import { Project } from './../../../models/entries/project';
import { DataProjectsService } from './../../../services/data-provider/data-projects.service';
import * as moment from 'moment/moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormErrorStateMatcher } from '../../../services/validators/form-error-state-matcher';
import { snackBarMsgs } from '../../../models/const-variables/snack-bar-msgs';


@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

    private projectSetSub: Subscription;
    public project: Project;
    public createDate: String;

    public errorMatcher = new FormErrorStateMatcher();
    public projectForm: FormGroup;
    public title: FormControl;
    public description: FormControl;
    public code: FormControl;

    private dateFormat = 'Do MMM YYYY, HH:MM';


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
            this.createDate = moment(currentProject.create_date).format(this.dateFormat);
        }
    }

    ngOnDestroy() {
        this.projectSetSub.unsubscribe();
    }

    private initProjectForm(): void {
        this.title = new FormControl(
            { value: this.project.title, disabled: !this.isAdmin() },
            [Validators.required,
            Validators.maxLength(100)]
        );
        this.description = new FormControl(
            { value: this.project.description ? this.project.description : '', disabled: !this.isAdmin() },
            [Validators.maxLength(1000)]
        );
        this.code = new FormControl(
           { value: this.project.code, disabled: !this.isAdmin() },
           [Validators.required,
            Validators.maxLength(20)]
        );
        this.projectForm = new FormGroup({
            title: this.title,
            description: this.description,
            code: this.code
        });
    }


    public isChangeExist(): boolean {
        const desc = this.project.description ? this.project.description : '';
        return  this.project.title !== this.title.value ||
                desc !== this.description.value ||
                this.project.code !== this.code.value;
    }

    public updateProject(): void {
        this.project.title = this.title.value;
        this.project.description = this.description.value ? this.description.value : '';
        this.project.code = this.code.value;
        this.dataProvider.updateProject(this.project).then(() =>  this.snackNar.open(snackBarMsgs.updateProjectSuccess));
    }

    public cancel(): void {
        this.title.setValue(this.project.title);
        this.description.setValue(this.project.description ? this.project.description : null);
        this.code.setValue(this.project.code);
    }

    public isAdmin(): boolean {
        return  this.service.getUserRole === projectRoles.admin ||
                this.service.getUserRole === projectRoles.creator;
    }


}
