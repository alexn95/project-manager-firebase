import { errors$ } from './../error-handler/error-handler.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { SnackBarOpts } from '../../models/snackbat-options';
import { snackBarMsgs } from '../../environments/const-variables/snack-bar-msgs';

@Injectable()
export class SnackBarService {

    constructor(
        private snackBar: MatSnackBar
    ) {
        errors$.subscribe((error: Error) => {
            console.log('%cERROR\n%o', 'color:white;background-color:red', error);
            if (error.message.length > 200) {
                error.message = error.message.substr(0, 200) + ' ...';
            }
            this.snackBar.open(error.message, snackBarMsgs.error.action, snackBarMsgs.error.config);
        });
    }

    public open(options: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(options.message, options.action, options.config);
    }

    public openMsg(message: string, options: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, options.action, options.config);
    }

}
