import { SnackBarService } from './../../services/snack-bar/snack-bar.service';
import { Issue } from './../../models/entries/issue';
import { DataIssuesService } from './../../services/data-provider/data-issues.service';
import { AgileBoardsService } from './../agile-boards/agile-boards.service';
import { Observable } from 'rxjs/Observable';
import { DataUsersService } from './../../services/data-provider/data-users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../services/validators/form-error-state-matcher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Project } from '../../models/entries/project';
import { UserRole } from '../../models/entries/user-role';
import { User } from '../../models/entries/user';
import { ProjectUser } from '../agile-boards/project-user.model';
import { issuesTypeArray, issuesPriorityArray, issuesStatesArray,
            issuesType, issuesPrioroty } from '../../models/const-variables/issues-constans';
import { snackBarMsgs } from '../../models/const-variables/snack-bar-msgs';

@Component({
    selector: 'app-issues-create',
    templateUrl: './issues-create.component.html'
})
export class IssuesCreateComponent implements OnInit {

    private project: Project;
    private issueState: number;

    public errorMatcher = new FormErrorStateMatcher();
    public issueForm: FormGroup;
    public summary: FormControl;
    public description: FormControl;
    public issueType: FormControl;
    public issuePriority: FormControl;
    public assignee: FormControl;

    public issuesTypes = issuesTypeArray;
    public issuesPriorities = issuesPriorityArray;
    public issuesStates = issuesStatesArray;
    public issuesUsers: ProjectUser[];

    public unassigned = { name: 'Unassigned', id: 'unassigned' };

    public users: User[];

    constructor(
        private dialogRef: MatDialogRef<IssuesCreateComponent>,
        private userService: DataUsersService,
        private issuesService: DataIssuesService,
        private agileBoardService: AgileBoardsService,
        private snackBar: SnackBarService,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

    ngOnInit() {
        this.project = this.data.project;
        this.issueState = this.data.state;
        this.issuesUsers = this.agileBoardService.projectUsers;
        this.initForm();

    }


    private initForm(): void {
        this.summary = new FormControl('', [
            Validators.required,
            Validators.maxLength(100)
        ]);
        this.description = new FormControl('', [
            Validators.maxLength(1000)
        ]);
        this.issueType = new FormControl(issuesTypeArray[issuesType.task]);
        this.issuePriority = new FormControl(issuesPriorityArray[issuesPrioroty.normal]);
        this.assignee = new FormControl(this.unassigned.id);
        this.issueForm = new FormGroup({
            summary: this.summary,
            description: this.description,
            issueType: this.issueType,
            issuePriority: this.issuePriority,
            assignee: this.assignee
        });
    }

    public createIssue(): void {
        const data: Issue = {
            id: null,
            number: null,
            create_date : null,
            description : this.description.value,
            summary : this.summary.value,
            author_id: null,
            priority: this.issuePriority.value,
            type: this.issueType.value,
            state: this.issueState,
            assigned_user_id: this.assignee.value === this.unassigned.id ? null : this.assignee.value,
            project_id: this.project.id,
            sprint_id: '1',
            days: null
        };
        this.issuesService.saveIssues(data).then(() => {
            this.agileBoardService.issues.push(data);
            this.snackBar.open(snackBarMsgs.issueCreate);
            this.dialogRef.close();
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }

    public isValid(): boolean {
        return this.issueForm.valid;
    }

}
