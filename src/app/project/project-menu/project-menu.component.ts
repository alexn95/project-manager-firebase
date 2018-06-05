import { DeleteComponent } from './../../delete/delete.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../project.service';
import { Project } from './../../../models/entries/project';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';
import { projectRoles } from '../../../models/const-variables/project-roles';
import { matDialogOptions } from '../../../models/const-variables/mat-dialog-options';
import { routingUrl } from '../../../models/const-variables/routing-url';
import { deleteType } from '../../../models/const-variables/enities';


@Component({
    selector: 'app-project-menu',
    templateUrl: './project-menu.component.html'
})
export class ProjectMenuComponent implements OnInit, OnDestroy {

    public project: Project;
    public isLoad: boolean;

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
    }

    ngOnDestroy() {
        this.projectSetSub.unsubscribe();
    }

    public deleteProject(): void {
        this.projectDeleteModal.open(DeleteComponent, {
            width: matDialogOptions.deleteWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { id: this.project.id, type: deleteType.deleteProject },
            panelClass: matDialogOptions.matDialogClass
        });
    }

    public leaveProject(): void {
        this.projectDeleteModal.open(DeleteComponent, {
            width: matDialogOptions.deleteWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { id: this.project.id, type: deleteType.leaveProject },
            panelClass: matDialogOptions.matDialogClass
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
        return this.service.getUserRole === projectRoles.creator;
    }

    public isAdmin(): boolean {
        return  this.service.getUserRole === projectRoles.admin ||
                this.service.getUserRole === projectRoles.creator;
    }


}
