import { DataProviderService } from './../../../services/data-provider/data-provider.service';
import { matDialogOptions } from './../../../environments/const-variables/mat-dialog-options';
import { ProjectInviteUsersComponent } from './../project-users-invite/project-invite-users.comonent';
import { DataProjectsService } from './../../../services/data-provider/data-projects.service';
import { projectRoles, projectRolesArray } from './../../../environments/const-variables/project-roles';
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
        private inviteUserDialog: MatDialog
    ) {
        this.roles = [
            { role: projectRolesArray[projectRoles.admin], value: projectRoles.admin },
            { role: projectRolesArray[projectRoles.developer], value: projectRoles.developer }
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

    public isCreator(role: number): boolean {
        return role === projectRoles.creator;
    }

    public changeRole(role: number, userId: string): void {
        this.projectsService.changeUserRole(userId, this.project.id, role)
            .then(() => this.service.setUserRole = role);
    }

    public inviteUsers(): void {
        this.inviteUserDialog.open(ProjectInviteUsersComponent, {
            width: matDialogOptions.inviteUsersWidth,
            autoFocus: matDialogOptions.autoFocus,
            data: { projectId: this.project.id, users: this.users }
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



}
