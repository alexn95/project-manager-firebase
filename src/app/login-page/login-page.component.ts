import { DataProviderService } from './../../services/data-provider/data-provider.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

    constructor(
        dataProvider: DataProviderService
    ) {
        dataProvider.writeDate();
    }

    ngOnInit() {
    }

}
