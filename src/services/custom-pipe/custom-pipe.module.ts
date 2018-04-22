import { NgModule } from '@angular/core';
import { KeysPipe } from './custom-ng-for';

@NgModule({
    imports:        [],
    declarations:   [KeysPipe],
    exports:        [KeysPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
