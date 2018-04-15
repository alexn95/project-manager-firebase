import { AuthService } from './../../services/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/app';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

    public user: User;

    constructor(
        public authSrervice: AuthService
    ) {
        this.user = authSrervice.getUser;
    }

    ngOnInit() {
    }

    public logout(): void {
        this.authSrervice.logout();
    }

}
