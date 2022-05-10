import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../auth/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ShowMessageService } from '../show-message/show-message.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private message: ShowMessageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req;
    if (
      req.url.startsWith(environment.endpoint) &&
      !(
        req.url.startsWith(environment.endpoint + 'signup') ||
        req.url.startsWith(environment.endpoint + 'signin')
      )
    ) {
      newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      });
    }
    return next.handle(newReq).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401 || errorResponse.status === 403) {
          this.router.navigate(['/login']).then();
        }
        this.message.showMessage(`${errorResponse.message}`);
        return throwError(() => {
          return new Error(`${errorResponse.message}`);
        });
      })
    );
  }
}
