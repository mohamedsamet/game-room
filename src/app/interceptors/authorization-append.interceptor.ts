import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_ID } from '../constants/rooms.constant';

@Injectable()
export class AuthorizationAppendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userId = localStorage.getItem(LOCAL_STORAGE_ID);
    request = request.clone({
      headers: request.headers.set('Authorization', userId ? userId : '')
    });
    return next.handle(request);
  }
}
