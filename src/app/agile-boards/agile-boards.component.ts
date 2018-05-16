import { matDialogOptions } from './../../environments/const-variables/mat-dialog-options';
import { IssuesCreateComponent } from './../issues-create/issues-create.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl } from '@angular/forms';
import { errorMessages } from './../../environments/const-variables/error-messages';
import { AgileBoardsService } from './agile-boards.service';
import { DragulaService } from 'ng2-dragula';
import { issuesState, issuesStatesArray } from './../../environments/const-variables/issues-constans';
import { DataIssuesService } from './../../services/data-provider/data-issues.service';
import { Issue } from './../../models/entries/issue';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { Project } from '../../models/entries/project';


@Component({
    selector: 'app-agile-boards',
    templateUrl: './agile-boards.component.html'
})
export class AgileBoardsComponent implements OnInit, OnDestroy {

    public issues: Issue[];
    public openIssues: Issue[];
    public inProgressIssues: Issue[];
    public toVerifyIssues: Issue[];
    public doneIssues: Issue[];

    public projects: Project[];
    public choicedProject: Project;

    public selectProject: FormControl;
    private selectProjectSub$: Subscription;

    constructor(
        private service: AgileBoardsService,
        private issuesService: DataIssuesService,
        private dragulaService: DragulaService,
        private route: ActivatedRoute,
        private createIssueModal: MatDialog,
    ) {
    }

    ngOnInit() {
        // this.issuesService.saveIssues('TaskTaskTaskTas askTaskTask askTaskTask', 'desc', 3);
        this.selectProject = new FormControl();
        this.service.initProjects().switchMap(() => {
            return this.route.params;
        }).subscribe((params) => {
            this.initProject(params['id']);
        });

        this.service.onChangeIssueState();

        this.selectProjectSub$ = this.selectProject.valueChanges
        .subscribe((project) => {
            this.service.initChoicedProject(project.id).then(() => {
                this.initProjectData();
            });
        });

    }

    ngOnDestroy () {
        this.selectProjectSub$.unsubscribe();
    }

    private initProject(id: string): void {
        this.projects = this.service.projects;
        if (this.projects.length > 0) {
            this.service.initChoicedProject(id)
            .then(() => {
                this.projects = this.service.projects;
                this.initProjectData();
                this.selectProject.setValue(this.choicedProject, { emitEvent: true });
            });
        }
    }

    private initProjectData(): void {
        this.choicedProject = this.service.choicedProject;
        this.issues = this.service.issues;
        this.issuesForState(this.issues);
    }

    private issuesForState(issues: Issue[]): void {
        this.openIssues = new Array<Issue>();
        this.inProgressIssues = new Array<Issue>();
        this.toVerifyIssues = new Array<Issue>();
        this.doneIssues = new Array<Issue>();
        issues.forEach((issue: Issue) => {
            switch (issue.state) {
                case issuesState.open:
                    this.openIssues.push(issue);
                    break;
                case issuesState.inProgress:
                    this.inProgressIssues.push(issue);
                    break;
                case issuesState.toVerify:
                    this.toVerifyIssues.push(issue);
                    break;
                case issuesState.done:
                    this.doneIssues.push(issue);
                    break;
                default:
                    console.log(issue.state);
                    throw new Error(errorMessages.inalidIssuesStateError);
            }
        });
    }


    public createIssue(state: number): void {
        this.createIssueModal.open(IssuesCreateComponent, {
            width: matDialogOptions.createIssueWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { project: this.choicedProject, state: state },
            panelClass: matDialogOptions.createIssuepanelClass
        }).afterClosed().subscribe(() => {
           console.log('close');
        });
    }

}
