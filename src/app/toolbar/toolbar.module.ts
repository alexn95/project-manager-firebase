import { ServicesModule } from './../../services/services.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        RouterModule,
        BrowserModule,
        CommonModule,
        ServicesModule,
    ],
    declarations: [
        ToolbarComponent
    ],
    exports: [
        ToolbarComponent
    ],
    providers: [
    ]
})
export class ToolbarModule {
}
