import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { SnackBarOpts } from '../../models/snackbat-options';

@Injectable()
export class SnackBarService {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    public open(options: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(options.message, options.action, options.config);
    }

    public openMsg(message: string, options: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, options.action, options.config);
    }

}
