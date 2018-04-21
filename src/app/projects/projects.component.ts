import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { AuthService } from './../../services/auth/auth.service';
import { User } from 'firebase/app';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

    public items = [1, 2, 3, 4, 5, 6, 7, 8];

    public user: User;

    constructor(
        public authSrervice: AuthService,
        public dataProvider: DataProviderService
    ) {
        authSrervice.fetchUser().subscribe(
            user => this.user = user
        );
        dataProvider.searchProjects();
    }

    ngOnInit() {
    }

}
