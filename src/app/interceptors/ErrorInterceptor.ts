import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorserviceService } from '../services/errorservice.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

      private errorService = inject(ErrorserviceService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
       // alert(`Error: ${error.message}`);
        const errorMessage = error.message || 'Unknown error occurred';
        this.errorService.reportError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}