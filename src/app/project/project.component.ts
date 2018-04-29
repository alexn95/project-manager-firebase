import { SnackBarService } from './../../services/snack-bar/snack-bar.service';
import { Project } from './../../models/entries/project';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { FormErrorStateMatcher } from './../../models/form-error-state-matcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { snackBarMsgs } from '../../environments/const-variables';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    public project: Project;

    public errorMatcher = new FormErrorStateMatcher();
    public projectForm: FormGroup;
    public title: FormControl;
    public description: FormControl;

    constructor(
        private route: ActivatedRoute,
        private dataProvider: DataProjectsService,
        private snackNar: SnackBarService,
    ) {
        this.initProject().subscribe( () => {
            this.initProjectForm();
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private initProjectForm(): void {
        this.title = new FormControl(this.project.title, [
            Validators.required,
            Validators.maxLength(100)
        ]);
        this.description = new FormControl(this.project.description, [
            Validators.maxLength(1000)
        ]);
        this.projectForm = new FormGroup({
            title: this.title,
            description: this.description
        });
    }

    private initProject(): Observable<void> {
        return new Observable(observer => {
            this.sub = this.route.params.subscribe(params => {
                this.dataProvider.getProjectById(params['id'])
                .subscribe((project: Project) => {
                    this.project = project;
                    observer.next();
                });
            });
        });
    }

    public isChangeExist(): boolean {
        return  this.project.title !== this.title.value ||
                this.project.description !== this.description.value;
    }

    public updateProject(): void {
        this.project.title = this.title.value;
        this.project.description = this.description.value;
        this.dataProvider.updateProject(this.project).subscribe(() =>  this.snackNar.open(snackBarMsgs.updateProjectSuccess));
    }

    public cancel(): void {
        this.title.setValue(this.project.title);
        this.description.setValue(this.project.description);
    }

}
