import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const injector = inject(Injector);

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const authService = injector.get(AuthService);

      if (error.status === 401) {
        if (
          req.url.includes('/auth/login') ||
          req.url.includes('/auth/refresh') ||
          req.url.includes('/auth/logout')
        ) {
          return throwError(() => error);
        }

        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(result => result),
            take(1),
            switchMap(() => next(authReq))
          );
        }

        isRefreshing = true;
        refreshTokenSubject.next(false);

        return authService.refresh().pipe(
          switchMap(() => {
            isRefreshing = false;
            refreshTokenSubject.next(true);
            return next(authReq);
          }),
          catchError(refreshErr => {
            isRefreshing = false;
            refreshTokenSubject.next(false);
            authService.clearAuth();

            if (!req.url.includes('/auth/me')) {
              router.navigate(['/login']);
            }
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
