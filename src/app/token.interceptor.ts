import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, take } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AngularFireAuth) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.idToken.pipe(
      take(1), // <-------------- only emit the first value!

      switchMap((token: any) => {
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
            url: environment.apiUrl + 'api/' + request.url,
          });
        }
        return next.handle(request);
      })
    );
  }
}
