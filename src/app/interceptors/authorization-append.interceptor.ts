import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationAppendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hash = localStorage.getItem('hash');
    request = request.clone({
      headers: request.headers.set('Authorization', hash ? hash : '')
    });
    return next.handle(request);
  }
}
