import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
      req.url.startsWith('api') &&
      !(req.url.startsWith('api/signup') || req.url.startsWith('api/signin'))
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
