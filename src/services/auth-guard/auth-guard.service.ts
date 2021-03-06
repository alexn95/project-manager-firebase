import { SnackBarService } from './../snack-bar/snack-bar.service';
import { AuthEvents } from './../auth/auth-events';
import { AuthService } from './../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { routingUrl } from '../../models/const-variables/routing-url';
import { snackBarMsgs } from '../../models/const-variables/snack-bar-msgs';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private snackBar: SnackBarService
    ) {
    }

    public canActivate(): Observable<boolean> {
        return this.authService.getAuthEvents
            .map(event => event === AuthEvents.AUTHENTICATED)
            .map(
                auth => {
                    if (auth) {
                        console.log('%c%s', 'color:green', 'authenticated successfully');
                        return true;
                    } else {
                        console.log('%c%s', 'color:red', 'access denied');
                        this.router.navigateByUrl(routingUrl.loginPage);
                        this.snackBar.open(snackBarMsgs.mustLogin);
                        return false;
                    }
                }
            );
    }

}
