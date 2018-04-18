import { AuthService } from './../../services/auth/auth.service';
import { User } from 'firebase/app';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

    public user: User;

    constructor(
        public authSrervice: AuthService
    ) {
        authSrervice.fetchUser().subscribe(
            user => this.user = user
        );
    }

    ngOnInit() {
    }

}
