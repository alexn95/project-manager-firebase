import { DeleteComponent } from './../../delete/delete.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../project.service';
import { Project } from './../../../models/entries/project';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';
import { projectRoles } from '../../../models/const-variables/project-roles';
import { matDialogOptions } from '../../../models/const-variables/mat-dialog-options';
import { entities } from '../../../models/const-variables/enities';
import { routingUrl } from '../../../models/const-variables/routing-url';


@Component({
    selector: 'app-project-menu',
    templateUrl: './project-menu.component.html'
})
export class ProjectMenuComponent implements OnInit, OnDestroy {

    public project: Project;
    public userRole: projectRoles;

    private projectSetSub: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: ProjectService,
        private projectDeleteModal: MatDialog,
    ) {
    }

    ngOnInit() {
        this.projectSetSub = this.service.projectSet.subscribe((project: Project) => {
            this.project = project;
        });
        this.userRole = this.service.getUserRole;
    }

    ngOnDestroy() {
        this.projectSetSub.unsubscribe();
    }

    public deleteProject(): void {
        this.projectDeleteModal.open(DeleteComponent, {
            width: matDialogOptions.deleteWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { id: this.project.id, title: this.project.title, entity: entities.project },
            panelClass: matDialogOptions.matDialogClass
        }).afterClosed().subscribe(() => {
           console.log('close');
        });
    }

    public getDetailsUrl(): {} {
        return { outlets: {  content : routingUrl.contentDetails  } };
    }

    public getUsersUrl(): {} {
        return { outlets: {  content : routingUrl.contentUsers  } };
    }

    public getIssuesUrl(): Array<string> {
        return ['/' + routingUrl.agileBoards, this.project.id];
    }

    public getCreateIssuesUrl(): Array<string> {
        return ['/' + routingUrl.agileBoards, this.project.id];
    }

    public isCreator(): boolean {
        return this.userRole === projectRoles.creator;
    }

    public isAdmin(): boolean {
        return this.userRole === projectRoles.admin || this.userRole === projectRoles.creator;
    }

}
