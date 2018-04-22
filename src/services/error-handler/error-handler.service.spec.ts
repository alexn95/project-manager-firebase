import { TestBed, inject } from '@angular/core/testing';

import { GlobalErrorHandler } from './error-handler.service';

describe('GlobalErrorHandler', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GlobalErrorHandler]
        });
    });

    it('should be created', inject([GlobalErrorHandler], (service: GlobalErrorHandler) => {
        expect(service).toBeTruthy();
    }));
});
