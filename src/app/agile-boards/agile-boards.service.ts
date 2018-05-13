import { DataIssuesService } from './../../services/data-provider/data-issues.service';

import { issuesStatesArray, IssuesStates } from './../../environments/const-variables/issues-constans';
import { DragulaService } from 'ng2-dragula';
import { Injectable } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { Issue } from '../../models/entries/issue';


@Injectable()
export class AgileBoardsService {

    public issues: Issue[];

    constructor(
        private dragulaService: DragulaService,
        private issuesService: DataIssuesService,
    ) {
    }

    private getClass(args: any): string {
        // tslint:disable-next-line:prefer-const
        const [e, el] = args.slice(2);
        return e.className.split(' ')[0];
    }

    private getState(args: any): number {
        switch (this.getClass(args)) {
            case 'open':
                return IssuesStates.open;
            case 'in-progress':
                return IssuesStates.inProgress;
            case 'to-verify':
                return IssuesStates.toVerify;
            case 'done':
                return IssuesStates.done;
            default:
                console.log(this.getClass(args));
                throw new Error('Undefinde issues state error.');
        }
    }

    public updateIssueState(): void {
        this.dragulaService.drop.subscribe((args) => {
            // tslint:disable-next-line:prefer-const
            const [targetE, targetEl] = args.slice(1);
            const id = targetE.getAttribute('item-id');
            // const projectId = targetE.getAttribute('project-id');
            const issue = this.issues.filter(currentIssue => currentIssue.id === id)[0];
            issue.state = this.getState(args);
            this.issuesService.updateIssueState(issue).then();
        });
    }

}
