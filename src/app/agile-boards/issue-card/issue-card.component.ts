import { IssueModalComponent } from './../issue-modal/issue-modal.component';
import { matDialogOptions } from './../../../models/const-variables/mat-dialog-options';
import { MatDialog } from '@angular/material';
import { AgileBoardsService } from './../agile-boards.service';
import { Project } from './../../../models/entries/project';
import { DataUsersService } from './../../../services/data-provider/data-users.service';
import { Component, OnInit, Input } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { Issue } from '../../../models/entries/issue';
import { User } from '../../../models/entries/user';
import { issuesState, issuesPriorityArray, issuesPrioroty } from '../../../models/const-variables/issues-constans';

@Component({
    selector: 'app-issue-card',
    templateUrl: './issue-card.component.html'
})
export class IssueCardComponent implements OnInit {

    @Input() issue: Issue;
    private project: Project;

    public assignUser = 'Loading ... ';
    public assignUserTooltip = 'Loading ... ';
    public projectCode: string;

    constructor(
        private userService: DataUsersService,
        private service: AgileBoardsService,
        private issueModal: MatDialog,
    ) {
    }

    ngOnInit() {
        this.initIssueUser();
        this.project = this.service.choicedProject;
        this.projectCode = this.project.code;
    }

    private initIssueUser(): void {
        if (this.issue.assigned_user_id) {
            this.userService.getUserById(this.issue.assigned_user_id)
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
        return this.issue.state === issuesState.done ? 'issue-card__number_done' : '';
    }

    public getIssueClasses(): {} {
        switch (this.issue.priority) {
            case issuesPriorityArray[issuesPrioroty.minor]:
                return 'issue-card_priority_minor';
            case issuesPriorityArray[issuesPrioroty.normal]:
                return 'issue-card_priority_normal';
            case issuesPriorityArray[issuesPrioroty.major]:
                return 'issue-card_priority_major';
            case issuesPriorityArray[issuesPrioroty.critical]:
                return 'issue-card_priority_critical';
        }
    }

    public openIssue(): void {
        this.issueModal.open(IssueModalComponent, {
            width: matDialogOptions.issueModalWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { issue: this.issue },
            panelClass: matDialogOptions.matDialogClass
        }).afterClosed().subscribe(() => {
           console.log('close');
        });
    }


}
