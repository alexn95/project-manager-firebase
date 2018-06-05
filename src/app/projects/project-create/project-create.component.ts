import { dialogRefResult } from './../../../models/const-variables/dialog-ref-result';
import { snackBarMsgs } from './../../../models/const-variables/snack-bar-msgs';
import { SnackBarService } from './../../../services/snack-bar/snack-bar.service';
import { DataProjectsService } from './../../../services/data-provider/data-projects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../services/validators/form-error-state-matcher';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent implements OnInit {

    public errorMatcher = new FormErrorStateMatcher();
    public projectForm: FormGroup;
    public title: FormControl;
    public description: FormControl;
    public code: FormControl;

    constructor(
        private dialogRef: MatDialogRef<ProjectCreateComponent>,
        private projectService: DataProjectsService,
        private snackBar: SnackBarService,
    ) {}

    ngOnInit(): void {
        this.initProjectForm();
    }

    private initProjectForm(): void {
        this.title = new FormControl('', [
            Validators.required,
            Validators.maxLength(100)
        ]);
        this.description = new FormControl(null, [
            Validators.maxLength(1000)
        ]);
        this.code = new FormControl('', [
            Validators.required,
            Validators.maxLength(20)
        ]);
        this.projectForm = new FormGroup({
            title: this.title,
            description: this.description,
            code: this.code
        });
    }

    public cancel(): void {
        this.dialogRef.close(dialogRefResult.close);
    }

    public saveProject(): void {
        this.projectService.saveProject(this.title.value, this.description.value, this.code.value).then(() => {
            this.dialogRef.close(dialogRefResult.create);
            this.snackBar.open(snackBarMsgs.projectCreate);
        });
    }


}
