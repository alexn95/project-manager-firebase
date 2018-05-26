import { IssuesCreateComponent } from './../issues-create/issues-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgileBoardsService } from './agile-boards.service';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { AgileBoardsComponent } from './agile-boards.component';
import { ServicesModule } from './../../services/services.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatIconModule, MatCardModule, MatTooltipModule,
    MatSelectModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';



@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        ServicesModule,
        MatDialogModule,
        MatIconModule,
        DragulaModule,
        MatCardModule,
        MatTooltipModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
    ],
    declarations: [
        AgileBoardsComponent,
        IssueCardComponent
    ],
    exports: [
        AgileBoardsComponent,
        IssueCardComponent
    ],
    providers: [
        AgileBoardsService
    ],
    entryComponents: [
        IssuesCreateComponent
    ]
})
export class AgileBoardsModule {
}
