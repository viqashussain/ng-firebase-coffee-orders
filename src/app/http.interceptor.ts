import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(event => {
                console.log('here')
                return event;
            }),
            // catchError((error: HttpErrorResponse) => {
            //     if (error.status === 401) {
            //         this.router.navigate(['/auth/login']);
            //     }
            //     else {
            //         if (responseContainsValidationErrors(error))
            //         {
            //             this.showValidationErrors(error.error.validationErrors);
            //         }
            //         else
            //         {
            //             this.showToastrError(error);
            //         }
            //         return throwError(error);
            //     }
            // })
        );
    }
}