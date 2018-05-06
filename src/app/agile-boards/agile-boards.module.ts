import { AgileBoardsComponent } from './agile-boards.component';
import { ServicesModule } from './../../services/services.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        MatButtonModule,
        RouterModule,
        BrowserModule,
        CommonModule,
        ServicesModule,
        MatDialogModule,
        MatIconModule,
    ],
    declarations: [
        AgileBoardsComponent
    ],
    exports: [
        AgileBoardsComponent
    ],
    providers: [
    ]
})
export class AgileBoardsModule {
}
