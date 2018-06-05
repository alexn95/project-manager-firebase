import { dialogRefResult } from './../../models/const-variables/dialog-ref-result';
import { matDialogOptions } from './../../models/const-variables/mat-dialog-options';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { User } from 'firebase/app';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../models/entries/project';
import { Subscription } from 'rxjs/Subscription';
import { routingUrl } from '../../models/const-variables/routing-url';
import { ProjectCreateComponent } from './project-create/project-create.component';


@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {

    public projects: Project[];
    public projectsUrl = routingUrl.projects;
    public agileBoardsUrl = routingUrl.agileBoards;
    public searchProjectsForm: FormControl;

    private searchSub$: Subscription;

    constructor(
        private dataProvider: DataProjectsService,
        private projectCreateModal: MatDialog,
    ) {
    }

    private searchProjects(text: string): void {
        this.dataProvider.searchProjects(text).subscribe(projects => {
            this.projects = projects;
        });
    }

    ngOnInit() {
        this.searchProjectsForm = new FormControl();
        this.searchProjects(null);
        this.searchSub$ = this.searchProjectsForm.valueChanges
        .debounceTime(800)
        .subscribe((text) => {
            this.searchProjects(text);
        });
    }

    ngOnDestroy() {
        this.searchSub$.unsubscribe();
    }

    createProject(): void {
        this.projectCreateModal.open(ProjectCreateComponent, {
            width: matDialogOptions.projectCreateWidth,
            autoFocus: matDialogOptions.autoFocus,
            panelClass: matDialogOptions.matDialogClass
        }).afterClosed().subscribe((result: dialogRefResult) => {
            if (result === dialogRefResult.create) {
                this.searchProjects(this.searchProjectsForm.value);
            }
            console.log('close');
        });
    }


}
