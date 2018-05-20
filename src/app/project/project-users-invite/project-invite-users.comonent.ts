import { ProjectUserData } from './../project-users/user-project.model';
import { UserSearchStatus } from './user-search.model';
import { User } from './../../../models/entries/user';
import { DataUsersService } from './../../../services/data-provider/data-users.service';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { snackBarMsgs } from './../../../environments/const-variables/snack-bar-msgs';
import { SnackBarService } from './../../../services/snack-bar/snack-bar.service';
import { routingUrl } from './../../../environments/const-variables/routing-url';
import { entities } from './../../../environments/const-variables/enities';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import { hasUserValidator } from '../../../services/validators/has-user-validator';
import { confirmPasswordValidator } from '../../../services/validators/confirm-password-validator';
import { FormErrorStateMatcher } from '../../../services/validators/form-error-state-matcher';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-invite-users-component',
    templateUrl: './project-invite-users.comonent.html'
})
export class ProjectInviteUsersComponent implements OnInit, OnDestroy {

    public inviteForm: FormGroup;
    public email: FormControl;
    public errorMatcher = new FormErrorStateMatcher();
    public status: UserSearchStatus;
    public users: ProjectUserData[];

    private invitedUser: User;
    private searchSub: Subscription;

    constructor(
        private snackBar: SnackBarService,
        private router: Router,
        private dialogRef: MatDialogRef<ProjectInviteUsersComponent>,
        private usersService: DataUsersService,
        private service: ProjectService,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
        this.status = UserSearchStatus.none;
        this.users = data.users;
    }

    ngOnInit() {
        this.initForm();
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }

    private initForm(): void {
        this.email = new FormControl('', [
            Validators.maxLength(100),
            Validators.required,
        ]);
        this.inviteForm = new FormGroup({
            email: this.email
        });
        this.searchSub = this.inviteForm.valueChanges
        .debounceTime(800)
        .subscribe(() => {
            this.searchUser();
        });
    }

    private searchUser(): void {
        this.status = UserSearchStatus.searched;
        this.usersService.getUserByEmail(this.email.value)
        .subscribe((user: User) => {
            if (user) {
                if (this.users.filter(projectUser => projectUser.user_id === user.id).length === 0) {
                    this.invitedUser = user;
                    this.status = UserSearchStatus.found;
                } else {
                    this.status = UserSearchStatus.inProject;
                    this.invitedUser = null;
                }
            } else {
                this.invitedUser = null;
                this.status = UserSearchStatus.notFounnd;
            }
        });
    }


    public invite(): void {
        this.usersService.inviteToProject(this.invitedUser.id, this.data.projectId).then(() => {
            this.snackBar.open(snackBarMsgs.userInviteSuccess);
            this.dialogRef.close();
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }


}
