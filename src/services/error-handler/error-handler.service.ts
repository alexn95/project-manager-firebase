import { snackBarMsgs } from './../../environments/const-variables';
import { SnackBarService } from './../snack-bar/snack-bar.service';
import { ErrorHandler, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export const errors$: Subject <Error> = new Subject();

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor() {
    }

    // tslint:disable-next-line:no-any
    handleError(error: Error): void {
        errors$.next(error);
    }

}
