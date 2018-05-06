import { User } from './../../models/entries/user';
import { DataUsersService } from './../data-provider/data-users.service';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from './../../app/project/project.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export function hasUserValidator(service: ProjectService): AsyncValidatorFn  {
    return (email: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return new Observable(observer => {
            // service.hasUser.subscribe((value: boolean) => {
            //     console.log(value);
            //     observer.next(value ? null : { 'hasUser': { value: email.value } });
            // });
        });
    };
}
