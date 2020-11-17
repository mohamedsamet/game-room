import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { AlertInterface } from '../interfaces/alert/alert.interface';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(@Inject('AlertInterface') private  alertInt: AlertInterface) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(tap(() => {},
        (err: any) => {
          this.alertInt.setAlertStatus(true, err.error);
          return throwError(err);
        })
    );
  }
}
