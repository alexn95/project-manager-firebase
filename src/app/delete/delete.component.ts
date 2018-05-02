import { snackBarMsgs } from './../../environments/const-variables/snack-bar-msgs';
import { SnackBarService } from './../../services/snack-bar/snack-bar.service';
import { routingUrl } from './../../environments/const-variables/routing-url';
import { entities } from './../../environments/const-variables/enities';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-delete-component',
    templateUrl: './delete.component.html'
})
export class DeleteComponent implements OnInit {

    public title: string;

    constructor(
        private snackBar: SnackBarService,
        private router: Router,
        private dialogRef: MatDialogRef<DeleteComponent>,
        private dataProvider: DataProjectsService,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
        this.title = data.title;
    }

    ngOnInit() {}


    public delete(): void {
        switch (this.data.entity) {
            case entities.project:
            this.dataProvider.deleteProject(this.data.id).then( () => {
                this.router.navigateByUrl(routingUrl.projects);
                this.dialogRef.close();
                this.snackBar.open(snackBarMsgs.deleteProjectSuccess);
            });
            break;
        }
    }

    public cancel(): void {
        this.dialogRef.close();
    }


}
