import { User } from './../../../models/entries/user';
import { DataUsersService } from './../../../services/data-provider/data-users.service';
import { Subscription } from 'rxjs/Subscription';
import { FormErrorStateMatcher } from './../../../models/form-error-state-matcher';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { snackBarMsgs } from './../../../environments/const-variables/snack-bar-msgs';
import { SnackBarService } from './../../../services/snack-bar/snack-bar.service';
import { routingUrl } from './../../../environments/const-variables/routing-url';
import { entities } from './../../../environments/const-variables/enities';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-invite-users-component',
    templateUrl: './project-invite-users.comonent.html'
})
export class ProjectInviteUsersComponent implements OnInit, OnDestroy {

    public inviteForm: FormGroup;
    public email: FormControl;
    public errorMatcher = new FormErrorStateMatcher();

    public hasUser: boolean;
    private invitedUser: User;
    private searchSub: Subscription;

    constructor(
        private snackBar: SnackBarService,
        private router: Router,
        private dialogRef: MatDialogRef<ProjectInviteUsersComponent>,
        private usersService: DataUsersService,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
        this.hasUser = false;
    }

    ngOnInit() {
        this.initForm();
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }

    private initForm(): void {
        this.email = new FormControl('', [
            Validators.required,
            Validators.maxLength(100)
        ]);
        this.inviteForm = new FormGroup({
            email: this.email
        });
        this.searchSub = this.inviteForm.valueChanges
        .debounceTime(800)
        .subscribe(() => {
            this.usersService.getUserByEmail(this.email.value)
            .subscribe((user: User) => {
                if (user) {
                    this.invitedUser = user;
                    this.hasUser = true;
                } else {
                    this.invitedUser = null;
                    this.hasUser = false;
                }
            });
        });
    }


    public invite(): void {
        this.usersService.inviteToProject(this.invitedUser.id, this.data.projectId).then(() => {

            this.dialogRef.close();
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }


}
