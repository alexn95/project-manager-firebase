import { AuthEvents } from './../auth/auth-events';
import { environment } from './../../environments/environment';
import { AuthService } from './../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        public authService: AuthService
    ) {
    }

    canActivate(): Observable<boolean> {
        return this.authService.getAuthEvents
            .map(event => event === AuthEvents.AUTHENTICATED)
            .map(
                auth => {
                    if (auth) {
                        console.log('%c%s', 'color:green', 'authenticated successfully');
                        return true;
                    } else {
                        console.log('%c%s', 'color:red', 'access denied');
                        this.router.navigateByUrl(environment.routing.loginPage);
                        return false;
                    }
                }
            );
    }

}
