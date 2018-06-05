import { DeleteComponent } from './../../delete/delete.component';
import { DataProviderService } from './../../../services/data-provider/data-provider.service';
import { ProjectInviteUsersComponent } from './../project-users-invite/project-invite-users.comonent';
import { DataProjectsService } from './../../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { DataUsersService } from './../../../services/data-provider/data-users.service';
import { UserRole } from './../../../models/entries/user-role';
import { ProjectService } from './../project.service';
import { Project } from './../../../models/entries/project';
import { Subscription } from 'rxjs/Subscription';
import { ProjectUserData } from './user-project.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { User } from '../../../models/entries/user';
import { projectRolesArray, projectRoles } from '../../../models/const-variables/project-roles';
import { matDialogOptions } from '../../../models/const-variables/mat-dialog-options';
import { deleteType } from '../../../models/const-variables/enities';

@Component({
    selector: 'app-project-users',
    templateUrl: './project-users.component.html'
})
export class ProjectUsersComponent implements OnInit, OnDestroy {

    private projectSetSub: Subscription;

    public project: Project;
    public roles: {}[];
    public creatorRole = projectRolesArray[projectRoles.creator];

    public dataSource: MatTableDataSource<ProjectUserData>;
    public users: ProjectUserData[];

    public displayedColumns = ['email', 'name', 'role', 'remove'];

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private service: ProjectService,
        private usersService: DataUsersService,
        private projectsService: DataProjectsService,
        private dataService: DataProviderService,
        private inviteUserDialog: MatDialog,
        private removeUserDialog: MatDialog
    ) {
        this.roles = [
            { role: projectRolesArray[projectRoles.admin], value: projectRoles.admin },
            { role: projectRolesArray[projectRoles.developer], value: projectRoles.developer },
            { role: projectRolesArray[projectRoles.creator], value: projectRoles.creator }
        ];
    }

    ngOnInit(): void {
        this.projectSetSub = this.service.projectSet.subscribe((project: Project) => {
            this.project = project;
            this.init();
        });
        const currentProject = this.service.getProject;
        if (currentProject) {
            this.project = currentProject;
            this.init();
        }
    }

    ngOnDestroy(): void {
        this.projectSetSub.unsubscribe();
    }

    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    public isUserCreator(role: number): boolean {
        return role === projectRoles.creator;
    }

    public changeRole(role: number, userId: string): void {
        this.projectsService.changeUserRole(userId, this.project.id, role)
            .then(() => {
            // this.service.setUserRole = role
            });
    }

    public inviteUsers(): void {
        this.inviteUserDialog.open(ProjectInviteUsersComponent, {
            width: matDialogOptions.inviteUsersWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { projectId: this.project.id, users: this.users },
            panelClass: matDialogOptions.matDialogClass
        }).afterClosed().subscribe(() => {
           console.log('close');
        });
    }

    private initUsers(): Observable<void> {
        return new Observable((observer) => {
            this.dataService.getProjectUsersRole(this.project.id).then((usersRole) => {
                this.dataService.getUsersAtProject(usersRole).subscribe((users) => {
                    users.map((user: User) => {
                        this.users.push({
                            user_id: user.id,
                            email: user.email,
                            name: user.first_name + ' ' + user.last_name,
                            role: usersRole.filter(role => role.user_id === user.id)[0].role
                        });
                    });
                    observer.next();
                });
            });
        });
    }

    private init(): void {
        this.users = new Array<ProjectUserData>();
        this.initUsers().subscribe(() => {
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.sort = this.sort;
        });
    }

    public removeUser(userId: string, role: number): void {
        if (this.canRemoveUser(role)) {
            this.removeUserDialog.open(DeleteComponent, {
                width: matDialogOptions.deleteWidth,
                autoFocus: matDialogOptions.autoFocus,
                data: { projectId: this.project.id, userId: userId, type: deleteType.removeUser },
                panelClass: matDialogOptions.matDialogClass
            }).afterClosed().subscribe(() => {
                this.init();
            });
        }
    }

    public isCreator(): boolean {
        return this.service.getUserRole === projectRoles.creator;
    }

    public isAdmin(): boolean {
        return  this.service.getUserRole === projectRoles.admin ||
                this.service.getUserRole === projectRoles.creator;
    }

    public canRemoveUser(role: number): boolean {
        return  (role === projectRoles.developer && this.isAdmin()) ||
                (role !== projectRoles.creator && this.isCreator());
    }


}
