import { projectRoles } from './../../environments/const-variables/project-roles';
import { AuthService } from './../../services/auth/auth.service';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { Project } from './../../models/entries/project';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class ProjectService {

    private userRole: projectRoles;
    private project: Project;
    public projectSet: EventEmitter<Project>;

    constructor(
        private dataProvider: DataProjectsService,
        private authService: AuthService,
    ) {
        this.projectSet = new EventEmitter<Project>();
    }

    get getProject(): Project {
        return this.project;
    }

    set setProject(project: Project) {
        this.project = project;
    }

    get getUserRole(): number {
        return this.userRole;
    }

    set setUserRole(role: projectRoles) {
        this.userRole = role;
    }

    public initProject(id: string): Promise<void> {
        return this.dataProvider.getProjectById(id)
        .then((project: Project) => {
            this.project = project;
            this.projectSet.emit(project);
            this.initUserRole();
        });
    }

    private initUserRole(): void {
        const users = Object.keys(this.project.users).map(key => this.project.users[key]);
        this.userRole = users.filter(user => user.user_id === this.authService.getUID)[0].role;
    }

}
