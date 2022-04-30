import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BaseUrlInterceptorService } from './api/services/base-url-interceptor/base-url-interceptor.service';
import { AuthInterceptorService } from './api/services/auth-interceptor/auth-interceptor.service';
import { LogInterceptorService } from './api/services/log-interceptor/log-interceptor.service';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LogInterceptorService, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptorService,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];
