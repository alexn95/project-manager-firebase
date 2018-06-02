import { CommentView } from './comment-view.model';
import { Comment } from './../../../models/entries/comment';
import { DataIssuesService } from './../../../services/data-provider/data-issues.service';
import { AuthService } from './../../../services/auth/auth.service';
import { DataUsersService } from './../../../services/data-provider/data-users.service';
import { User } from 'firebase/app';
import { AgileBoardsService } from './../agile-boards.service';
import { Project } from './../../../models/entries/project';
import { FormErrorStateMatcher } from './../../../services/validators/form-error-state-matcher';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { issuesStatesArray, issuesPriorityArray, issuesTypeArray } from './../../../models/const-variables/issues-constans';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Issue } from './../../../models/entries/issue';
import { Component, OnInit, Inject } from '@angular/core';
import { ProjectUser } from '../project-user.model';
import * as moment from 'moment/moment';

@Component({
    selector: 'app-issue-modal',
    templateUrl: './issue-modal.component.html'
})
export class IssueModalComponent implements OnInit {

    public issue: Issue;
    public project: Project;
    public comments: Comment[];
    public commentsView: CommentView[];
    public projectCode: string;

    public errorMatcher = new FormErrorStateMatcher();
    public issueForm: FormGroup;
    public summary: FormControl;
    public description: FormControl;
    public issueType: FormControl;
    public issuePriority: FormControl;
    public assignee: FormControl;
    public days: FormControl;

    public commentForm: FormGroup;
    public comment: FormControl;

    public issuesTypes = issuesTypeArray;
    public issuesPriorities = issuesPriorityArray;
    public issuesStates = issuesStatesArray;
    public issuesUsers: ProjectUser[];
    public users: User[];

    public unassigned = { name: 'Unassigned', id: 'unassigned' };

    public createDate: string;
    public updateDate: string;
    public createUser: string;
    public updateUser: string;

    public isCommButtonDisabled: boolean;

    private dateFormat = 'Do MMM YYYY';
    private dateFormatComment = 'Do MMM YYYY, HH:mm';

    constructor(
        private dialogRef: MatDialogRef<IssueModalComponent>,
        private service: AgileBoardsService,
        private usersService: DataUsersService,
        private issuesService: DataIssuesService,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
    }

    ngOnInit() {
        this.issue = this.data.issue;
        this.issue.assigned_user_id = this.issue.assigned_user_id ? this.issue.assigned_user_id : null;
        this.issue.days = this.issue.days ? this.issue.days : null;
        this.project = this.service.choicedProject;
        this.projectCode = this.project.code;
        this.issuesUsers = this.service.projectUsers;
        this.initCommnets();
        this.initDates();
        this.initForm();
    }

    private initCommnets(): void {
        this.issuesService.getIssueComments(this.issue.id).then((comments) => {
            this.commentsView = [];
            this.comments = comments;
            comments.forEach((comment: Comment) => {
                this.addViewCommnet(comment);
            });
        });
    }

    private addViewCommnet(comment: Comment): void {
        const author = this.service.users.filter(user => user.id === comment.author_id)[0];
        if (author) {
            this.commentsView.push({
                content: comment.content,
                author: author.first_name + ' ' + author.last_name,
                create_date: moment(comment.create_date).format(this.dateFormatComment)
            });
        }
    }

    private initDates(): void {
        this.createDate = moment(this.issue.create_date).format(this.dateFormat);
        this.usersService.getUserById(this.issue.author_id).then((user) => {
            this.createUser = user.id === AuthService.CURRENT_USER_ID ? 'me' : user.first_name + ' ' + user.last_name;
        });
        if (this.issue.update_date) {
            this.updateDate =  moment(this.issue.update_date).format(this.dateFormat);
            this.usersService.getUserById(this.issue.update_user_id).then((user) => {
                this.updateUser = user.id === AuthService.CURRENT_USER_ID ? 'me' : user.first_name + ' ' + user.last_name;
            });
        }
    }

    private initForm(): void {
        this.summary = new FormControl(this.issue.summary, [
            Validators.required,
            Validators.maxLength(100)
        ]);
        this.description = new FormControl(this.issue.description, [
            Validators.maxLength(1000)
        ]);
        this.issueType = new FormControl(this.issue.type);
        this.issuePriority = new FormControl(this.issue.priority);
        this.assignee = new FormControl(this.issue.assigned_user_id ? this.issue.assigned_user_id : this.unassigned.id);
        this.days = new FormControl(this.issue.days, [
            Validators.pattern('^[0-9]*$'),
        ]);
        this.issueForm = new FormGroup({
            summary: this.summary,
            description: this.description,
            issueType: this.issueType,
            issuePriority: this.issuePriority,
            assignee: this.assignee,
            days: this.days,
        });
        this.comment = new FormControl('', [
            Validators.maxLength(1000)
        ]);
        this.commentForm = new FormGroup({
            comment: this.comment,
        });
    }

    private saveIssue(): void {
        this.issue.summary = this.summary.value;
        this.issue.description = this.description.value;
        this.issue.type = this.issueType.value;
        this.issue.priority = this.issuePriority.value;
        this.issue.days = this.days.value ? this.days.value : null;
        this.issue.assigned_user_id = this.assignee.value !== this.unassigned.id ? this.assignee.value : null;
    }

    public updateIssue(): void {
        this.saveIssue();
        this.issuesService.updateIssues(this.issue).then(() => {
        });
    }

    public isValid(): boolean {
        return  this.issueForm.valid && this.isChangeExist();
    }

    public isChangeExist(): boolean {
        const assignee = this.assignee.value !== this.unassigned.id ? this.assignee.value : null;
        const days = this.days.value !== '' ? this.days.value : null;
        return  this.summary.value !== this.issue.summary ||
                this.description.value !== this.issue.description ||
                this.issueType.value !== this.issue.type ||
                this.issuePriority.value !== this.issue.priority ||
                days !== this.issue.days ||
                assignee !== this.issue.assigned_user_id;
    }

    public cancel(): void {
        this.summary.setValue(this.issue.summary);
        this.description.setValue(this.issue.description);
        this.issueType.setValue(this.issue.type);
        this.issuePriority.setValue(this.issue.priority);
        this.days.setValue(this.issue.days);
        this.assignee.setValue(this.issue.assigned_user_id ? this.issue.assigned_user_id : this.unassigned.id);
    }

    public addComment(): void {
        this.isCommButtonDisabled = true;
        this.issuesService.addComment(this.comment.value, this.issue.id).then((comment) => {
            this.comments.push(comment);
            this.addViewCommnet(comment);
            this.isCommButtonDisabled = false;
            this.comment.setValue('');
        });
    }

    public commentIsValid(): boolean {
        return this.commentForm.valid && this.comment.value !== '' && !this.isCommButtonDisabled;
    }

    public deleteIssue(): void {
        this.issuesService.deleteIssue(this.issue).then(() => {
            this.dialogRef.close();
        });
    }

}
