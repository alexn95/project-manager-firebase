import { DataIssuesService } from './../../services/data-provider/data-issues.service';
import { AuthService } from './../../services/auth/auth.service';
import { SnackBarService } from './../../services/snack-bar/snack-bar.service';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { routingUrl } from '../../models/const-variables/routing-url';
import { snackBarMsgs } from '../../models/const-variables/snack-bar-msgs';
import { deleteType } from '../../models/const-variables/enities';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html'
})
export class DeleteComponent implements OnInit {

    public title: string;

    constructor(
        private snackBar: SnackBarService,
        private router: Router,
        private dialogRef: MatDialogRef<DeleteComponent>,
        private dataProvider: DataProjectsService,
        private issuesService: DataIssuesService,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
        this.title = data.title;
    }

    ngOnInit() {}


    public delete(): void {
        switch (this.data.type) {
            case deleteType.deleteProject:
                this.dataProvider.deleteProject(this.data.id).then( () => {
                    this.router.navigateByUrl(routingUrl.projects);
                    this.dialogRef.close();
                    this.snackBar.open(snackBarMsgs.deleteProjectSuccess);
                });
                break;
            case deleteType.leaveProject:
                this.dataProvider.leaveProject(this.data.id, AuthService.CURRENT_USER_ID).then( () => {
                    this.router.navigateByUrl(routingUrl.projects);
                    this.dialogRef.close();
                    this.snackBar.open(snackBarMsgs.leaveProjectSuccess);
                });
                break;
            case deleteType.removeUser:
                this.dataProvider.leaveProject(this.data.projectId, this.data.userId).then( () => {
                    this.dialogRef.close();
                    this.snackBar.open(snackBarMsgs.removeUserSuccess);
                });
                break;
            case deleteType.deleteIssue:
                this.issuesService.deleteIssue(this.data.issue).then(() => {
                    this.dialogRef.close(true);
                    this.snackBar.open(snackBarMsgs.deleteIssueSuccess);
                });
                break;
        }
    }

    public cancel(): void {
        this.dialogRef.close();
    }


}
