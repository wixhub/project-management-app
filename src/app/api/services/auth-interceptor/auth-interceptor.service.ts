import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import { AuthenticationService } from '../../../auth/services/authentication/authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req;
    if (
      req.url.startsWith(environment.endpoint) &&
      !(req.url.startsWith(environment.endpoint + 'signup') || req.url.startsWith(environment.endpoint + 'signin'))
    ) {
      newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      });
    }
    return next.handle(newReq);
  }
}
