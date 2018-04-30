import { matDialogOptions } from './../../../environments/const-variables/mat-dialog-options';
import { entities } from './../../../environments/const-variables/enities';
import { DeleteComponent } from './../../delete/delete.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../project.service';
import { Project } from './../../../models/entries/project';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
    selector: 'app-project-menu',
    templateUrl: './project-menu.component.html'
})
export class ProjectMenuComponent implements OnInit, OnDestroy {

    public project: Project;
    private projectSetSub: Subscription;


    constructor(
        private router: Router,
        private service: ProjectService,
        private projectDeleteModal: MatDialog,
    ) {
    }

    ngOnInit() {
        this.projectSetSub = this.service.projectSet.subscribe((project: Project) => {
            this.project = project;
        });
    }

    ngOnDestroy() {
        this.projectSetSub.unsubscribe();
    }

    public deleteProject(): void {
        this.projectDeleteModal.open(DeleteComponent, {
            width: matDialogOptions.delete.width,
            autoFocus: matDialogOptions.delete.autoFocus,
            data: { id: this.project.id, title: this.project.title, entity: entities.project }
        }).afterClosed().subscribe(() => {
           console.log('close');
        });
    }

    public showUsers(): void {
        this.service.showUsers();
    }

    public showDetails(): void {
        this.service.showDetails();
    }
}
