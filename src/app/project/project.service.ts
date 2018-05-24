import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { AuthService } from './../../services/auth/auth.service';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { Project } from './../../models/entries/project';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { projectRoles } from '../../models/const-variables/project-roles';



@Injectable()
export class ProjectService {

    private userRole: projectRoles;
    private project: Project;
    public projectSet: EventEmitter<Project>;

    constructor(
        private dataProjectService: DataProjectsService,
        private dataService: DataProviderService,
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
        return this.dataProjectService.getProjectById(id)
        .then((project: Project) => {
            this.project = project;
            this.projectSet.emit(project);
            return this.initUserRole();
        });
    }

    private initUserRole(): Promise<any> {
        return this.dataService.getProjectUserRole(this.project.id, this.authService.getUID).then((role) => {
            this.userRole = role.role;
        });
    }

}
