import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl } from '@angular/forms';
import { errorMessages } from './../../environments/const-variables/error-messages';
import { AgileBoardsService } from './agile-boards.service';
import { DragulaService } from 'ng2-dragula';
import { IssuesStates, issuesStatesArray } from './../../environments/const-variables/issues-constans';
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
        private dragulaService: DragulaService
    ) {
    }

    ngOnInit() {
        // this.issuesService.saveIssues('TaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTask', 'desc', 3);
        this.selectProject = new FormControl();
        this.service.init().subscribe(() => {
            this.initProject();
            this.choicedProject = this.service.choicedProject;
            this.selectProject.setValue(this.choicedProject, { emitEvent: true });
        });
        this.service.updateIssueState();
        this.selectProjectSub$ = this.selectProject.valueChanges
        .subscribe((project) => {
            this.service.initChoicedProject(project).then(() => {
                this.initProject();
            });
        });
    }

    ngOnDestroy () {
        this.selectProjectSub$.unsubscribe();
    }

    private initProject(): void {
        this.issues = this.service.issues;
        this.projects = this.service.projects;
        this.issuesForState(this.issues);
    }

    private issuesForState(issues: Issue[]): void {
        this.openIssues = new Array<Issue>();
        this.inProgressIssues = new Array<Issue>();
        this.toVerifyIssues = new Array<Issue>();
        this.doneIssues = new Array<Issue>();
        issues.forEach((issue: Issue) => {
            switch (issue.state) {
                case IssuesStates.open:
                    this.openIssues.push(issue);
                    break;
                case IssuesStates.inProgress:
                    this.inProgressIssues.push(issue);
                    break;
                case IssuesStates.toVerify:
                    this.toVerifyIssues.push(issue);
                    break;
                case IssuesStates.done:
                    this.doneIssues.push(issue);
                    break;
                default:
                    console.log(issue.state);
                    throw new Error(errorMessages.inalidIssuesStateError);
            }
        });
    }



}
