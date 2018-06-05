import { routingUrl } from './../../models/const-variables/routing-url';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    public getStartedLink = '/' + routingUrl.signupPage;

    constructor() { }

    ngOnInit() {
    }

}
