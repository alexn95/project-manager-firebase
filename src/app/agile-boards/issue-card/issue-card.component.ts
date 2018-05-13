import { DataUsersService } from './../../../services/data-provider/data-users.service';
import { issuesPriorityArray, IssuesPrioroty, IssuesStates } from './../../../environments/const-variables/issues-constans';
import { Component, OnInit, Input } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { Issue } from '../../../models/entries/issue';
import { User } from '../../../models/entries/user';

@Component({
    selector: 'app-issue-card',
    templateUrl: './issue-card.component.html'
})
export class IssueCardComponent implements OnInit {

    @Input() issue: Issue;
    public assignUser = 'Loading ... ';
    public assignUserTooltip = 'Loading ... ';

    constructor(
        private userService: DataUsersService,
    ) {
    }

    ngOnInit() {
        this.initIssueUser();
    }

    private initIssueUser(): void {
        if (this.issue.assigne_user_id) {
            this.userService.getUserById(this.issue.assigne_user_id)
                .then( (user) => {
                    this.assignUser = user.first_name + ' ' + user.last_name;
                    this.assignUserTooltip = 'Assigned to ' + user.first_name + ' ' + user.last_name;
                });
        } else {
            this.assignUser = 'Not assigned';
            this.assignUserTooltip = 'Not assigned';
        }
    }

    public getNumberClasses(): {} {
        return this.issue.state === IssuesStates.done ? 'issue-card__number_done' : '';
    }

    public getIssueClasses(): {} {
        switch (this.issue.priority) {
            case issuesPriorityArray[IssuesPrioroty.minor]:
                return 'issue-card_priority_minor';
            case issuesPriorityArray[IssuesPrioroty.normal]:
                return 'issue-card_priority_normal';
            case issuesPriorityArray[IssuesPrioroty.major]:
                return 'issue-card_priority_major';
            case issuesPriorityArray[IssuesPrioroty.critical]:
                return 'issue-card_priority_critical';
        }
    }

    public openIssue(): void {
        console.log('openIssue');
    }


}
