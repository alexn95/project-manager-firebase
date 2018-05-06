import { AuthEvents } from './../../services/auth/auth-events';
import { routingUrl } from './../../environments/const-variables/routing-url';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/app';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

    public userAction: string;
    public user: User;

    public logoNav: string;
    public projectsNav: string;
    public agileNav: string;

    constructor(
        public authSrervice: AuthService,
        public router: Router
    ) {
        authSrervice.fetchUser().subscribe(
            user => this.user = user
        );
        this.logoNav =  routingUrl.home;
        this.projectsNav = routingUrl.projects;
        this.agileNav = routingUrl.agileBoards;
        authSrervice.getAuthEvents.subscribe(
            (authEvent: AuthEvents) =>
                this.userAction = authEvent === AuthEvents.AUTHENTICATED ? 'log out' : 'log in'
        );
    }

    ngOnInit() {
    }


    public logout(): void {
        this.authSrervice.logout();
    }

    public navigateHome(): void {
        console.log('navigateHome');
        this.router.navigateByUrl(routingUrl.home);
    }

    public navigateAgileBoards(): void {
        console.log('navigateHome');
        this.router.navigateByUrl(routingUrl.projects);
    }

    public navigateProjects(): void {
        console.log('navigateHome');
        this.router.navigateByUrl(routingUrl.projects);
    }

}
