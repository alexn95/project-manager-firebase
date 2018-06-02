import { AuthService } from './../../services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl } from '@angular/forms';
import { AgileBoardsService } from './agile-boards.service';
import { DragulaService } from 'ng2-dragula';
import { DataIssuesService } from './../../services/data-provider/data-issues.service';
import { Issue } from './../../models/entries/issue';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { Project } from '../../models/entries/project';
import { issuesState } from '../../models/const-variables/issues-constans';
import { errorMessages } from '../../models/const-variables/error-messages';
import { matDialogOptions } from '../../models/const-variables/mat-dialog-options';
import { IssuesCreateComponent } from './issues-create/issues-create.component';
import * as firebase from 'firebase/app';


@Component({
    selector: 'app-agile-boards',
    templateUrl: './agile-boards.component.html'
})
export class AgileBoardsComponent implements OnInit, OnDestroy {

    private db: firebase.database.Database = firebase.database();

    public issues: Issue[];
    public openIssues: Issue[];
    public inProgressIssues: Issue[];
    public toVerifyIssues: Issue[];
    public doneIssues: Issue[];

    public projects: Project[];
    public choicedProject: Project;

    public selectProject: FormControl;
    public searchIssues: FormControl;
    public onlyUserIssue: FormControl;

    private selectProjectSub$: Subscription;
    private searchSub$: Subscription;
    private searchUserIssueSub$: Subscription;
    private onChangeSub$: any;

    constructor(
        private service: AgileBoardsService,
        private issuesService: DataIssuesService,
        private dragulaService: DragulaService,
        private route: ActivatedRoute,
        private createIssueModal: MatDialog,
    ) {
    }

    ngOnInit() {
        this.selectProject = new FormControl();
        this.searchIssues = new FormControl();
        this.onlyUserIssue = new FormControl(false);
        this.service.initProjects().switchMap(() => {
            this.projects = this.service.projects;
            return this.route.params;
        }).subscribe((params) => {
            if (this.projects.length > 0) {
                this.initProject(params['id']);
            } else {
                // проектов не сущуствует
            }
        });

        this.service.onChangeIssueState();

        this.selectProjectSub$ = this.selectProject.valueChanges
        .subscribe((project) => {
            this.service.initChoicedProject(project.id).then(() => {
                this.initProjectData();
            });
        });

        this.searchSub$ = this.searchIssues.valueChanges
        .debounceTime(800)
        .subscribe((text) => {
            this.filterIssues();
        });

        this.searchUserIssueSub$ = this.onlyUserIssue.valueChanges
        .subscribe((check) => {
            this.filterIssues();
        });

    }

    ngOnDestroy () {
        this.selectProjectSub$.unsubscribe();
        this.searchSub$.unsubscribe();
        this.searchUserIssueSub$.unsubscribe();
    }

    private filterIssues(): void {
        this.issues = this.service.issues;
        if (this.onlyUserIssue.value) {
            this.issues = this.issues.filter(issue => issue.assigned_user_id === AuthService.CURRENT_USER_ID);
        }
        if (this.searchIssues.value) {
            this.issues = this.issues.filter(issue =>
                issue.number === Number(this.searchIssues.value) ||
                issue.summary.includes(this.searchIssues.value)
            );
        }
        this.issuesForState(this.issues);
    }

    private initProject(id: string): void {
        this.service.initChoicedProject(id)
        .then(() => {
            this.initProjectData();
            this.selectProject.setValue(this.choicedProject, { emitEvent: true });
        });
    }

    private initProjectData(): void {
        this.choicedProject = this.service.choicedProject;
        this.subscribeOnAdd();
        this.subscribeOnDelete();
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

    private subscribeOnAdd(): void {
        const ref = this.db.ref('issues/' + this.choicedProject.id);
        ref.on('child_added', (res) => {
            this.service.initIssues().then(() => {
                this.issues = this.service.issues;
                this.issuesForState(this.issues);
            });
        });
    }

    private subscribeOnDelete(): void {
        const ref = this.db.ref('issues/' + this.choicedProject.id);
        ref.on('child_removed', (res) => {
            this.service.initIssues().then(() => {
                this.issues = this.service.issues;
                this.issuesForState(this.issues);
            });
        });
    }


    public createIssue(state: number): void {
        this.createIssueModal.open(IssuesCreateComponent, {
            width: matDialogOptions.createIssueWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { project: this.choicedProject, state: state },
            panelClass: matDialogOptions.matDialogClass
        }).afterClosed().subscribe(() => {
           console.log('close');
        });
    }

}
