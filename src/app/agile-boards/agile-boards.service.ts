import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { UserRole } from './../../models/entries/user-role';
import { DataUsersService } from './../../services/data-provider/data-users.service';
import { SnackBarService } from './../../services/snack-bar/snack-bar.service';
import { Project } from './../../models/entries/project';
import { DataIssuesService } from './../../services/data-provider/data-issues.service';
import { DragulaService } from 'ng2-dragula';
import { Injectable } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { DataProjectsService } from './../../services/data-provider/data-projects.service';
import { Observable } from 'rxjs/Observable';
import { Issue } from '../../models/entries/issue';
import { User } from '../../models/entries/user';
import { ProjectUser } from './project-user.model';
import { snackBarMsgs } from '../../models/const-variables/snack-bar-msgs';
import { issuesState } from '../../models/const-variables/issues-constans';
import { errorMessages } from '../../models/const-variables/error-messages';


@Injectable()
export class AgileBoardsService {

    public issues: Issue[];
    public users: User[];
    public projectUsers: ProjectUser[];

    public projects: Project[];
    public choicedProject: Project;

    constructor(
        private projectService: DataProjectsService,
        private userService: DataUsersService,
        private dataService: DataProviderService,
        private dragulaService: DragulaService,
        private issuesService: DataIssuesService,
        private auth: AuthService,
        private snackBar: SnackBarService,
    ) {
    }

    public initChoicedProject(id: string): Promise<void> {
        if (id) {
            const project = this.projects.filter(pr => pr.id === id)[0];
            if (project) {
                this.choicedProject = project;
            } else {
                this.snackBar.open(snackBarMsgs.projectNotFound);
                this.choicedProject = this.projects[0];
            }
        } else {
            this.choicedProject = this.projects[0];
        }
        return new Promise((resolve, reject) => {
            this.initProjectUsers().subscribe(() => {
                this.issuesService.getProjectIssues(this.choicedProject.id).then((issues) => {
                    this.issues = issues;
                    resolve();
                });
            });
        });
    }

    public initIssues(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.issuesService.getProjectIssues(this.choicedProject.id).then((issues) => {
                this.issues = issues;
                resolve();
            });
        });
    }

    public initProjects(): Observable<void[]> {
        this.projects = new Array<Project>();
        return Observable.of(this.auth.getUserProjectsData)
        .mergeMap(userProjects => {
            return Observable.forkJoin(
                userProjects.map(userProject => {
                    return this.projectService.getProjectById(userProject.project_id).then(project => {
                        this.projects.push(project);
                    });
                }
                )
            );
        });
    }

    public onChangeIssueState(): void {
        this.dragulaService.drop.subscribe((args) => {
            // tslint:disable-next-line:prefer-const
            const [targetE, targetEl] = args.slice(1);
            const id = targetE.getAttribute('item-id');
            // const projectId = targetE.getAttribute('project-id');
            const issue = this.issues.filter(currentIssue => currentIssue.id === id)[0];
            issue.state = this.getState(args);
            this.issuesService.updateIssueState(issue).then();
        });
    }

    public initProjectUsers(): Observable<void> {
        return new Observable(observer => {
            this.dataService.getProjectUsers(this.choicedProject.id).subscribe((users) => {
                this.users = users;
                this.projectUsers = new Array();
                users.forEach((user) => {
                    this.projectUsers.push({
                        name: user.first_name + ' ' + user.last_name,
                        id: user.id
                    });
                });
                observer.next();
            });
        });
    }


    private getClass(args: any): string {
        // tslint:disable-next-line:prefer-const
        const [e, el] = args.slice(2);
        return e.className.split(' ')[0];
    }

    private getState(args: any): number {
        switch (this.getClass(args)) {
            case 'open':
                return issuesState.open;
            case 'in-progress':
                return issuesState.inProgress;
            case 'to-verify':
                return issuesState.toVerify;
            case 'done':
                return issuesState.done;
            default:
                console.log(this.getClass(args));
                throw new Error(errorMessages.inalidIssuesStateError);
        }
    }

}
