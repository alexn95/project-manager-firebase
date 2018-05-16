import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from './../../services/services.module';
import { RouterModule } from '@angular/router';
import { IssuesCreateComponent } from './issues-create.component';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatSelectModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        MatButtonModule,
        RouterModule,
        ServicesModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
    ],
    declarations: [
        IssuesCreateComponent
    ],
    exports: [
        IssuesCreateComponent
    ],
    providers: [
    ]
})
export class IssuesCreateModule {
}
