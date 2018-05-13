import { AgileBoardsService } from './agile-boards.service';
import { DragulaService } from 'ng2-dragula';
import { IssuesStates, issuesStatesArray } from './../../environments/const-variables/issues-constans';
import { DataIssuesService } from './../../services/data-provider/data-issues.service';
import { Issue } from './../../models/entries/issue';
import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';


@Component({
    selector: 'app-agile-boards',
    templateUrl: './agile-boards.component.html'
})
export class AgileBoardsComponent implements OnInit {

    public issues: Issue[];
    public openIssues: Issue[];
    public inProgressIssues: Issue[];
    public toVerifyIssues: Issue[];
    public doneIssues: Issue[];

    constructor(
        private service: AgileBoardsService,
        private issuesService: DataIssuesService,
        private dragulaService: DragulaService
    ) {
    }

    ngOnInit() {
        // this.issuesService.saveIssues('TaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTaskTask', 'desc', 3);
        this.issuesService.getProjectIssues('-LBQWhEeuVEc_l0IFAs6').then((issues) => {
            this.service.issues = issues;
            this.issues = issues;
            this.issuesForState(issues);
        });
        this.service.updateIssueState();
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
                    throw new Error('Invalid issues state');
            }
        });
    }


}
