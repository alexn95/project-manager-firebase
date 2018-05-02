import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { DataUsersService } from './../../../services/data-provider/data-users.service';
import { UserRole } from './../../../models/entries/user-role';
import { ProjectService } from './../project.service';
import { Project } from './../../../models/entries/project';
import { Subscription } from 'rxjs/Subscription';
import { UserProject } from './user-project.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../../models/entries/user';
import { projectRolesArray } from '../../../environments/const-variables/project-roles';

@Component({
    selector: 'app-project-users',
    templateUrl: './project-users.component.html'
})
export class ProjectUsersComponent implements OnInit, OnDestroy {

    private projectSetSub: Subscription;
    public project: Project;

    public dataSource: MatTableDataSource<UserProject>;
    public users: UserProject[];

    public displayedColumns = ['email', 'name', 'role', 'action'];

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private service: ProjectService,
        private usersService: DataUsersService,
    ) {}

    ngOnInit(): void {
        this.projectSetSub = this.service.projectSet.subscribe((project: Project) => {
            this.project = project;
            this.initProject();
        });
        const currentProject = this.service.getProject;
        if (currentProject) {
            this.project = currentProject;
            this.initProject();
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

    private getUsers(): Observable<User[]> {
        const users = Object.keys(this.project.users).map(key => this.project.users[key]);
        return Observable.of(users)
            .mergeMap(flatUsers => {
                return Observable.forkJoin(
                    flatUsers.map((userData: UserRole) =>
                        this.usersService.getUserById(userData.user_id)
                    )
                );
            });
    }


    private initProject(): void {
        this.users = new Array<UserProject>();
        this.getUsers().subscribe(res => {
            res.map((user: User) => {
                this.users.push({
                    email: user.email,
                    name: user.first_name + ' ' + user.last_name,
                    role: projectRolesArray[this.project.users[user.id].role]
                });
            });
            console.log(this.users);
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.sort = this.sort;
        });
    }



}
