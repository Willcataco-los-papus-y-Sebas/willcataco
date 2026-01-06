import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth/auth';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const guestGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.loading).pipe(
    filter(loading => !loading),
    take(1),
    map(() => {
      if (auth.isAuthenticated()) {
        const redirectTo = route.data?.['redirectTo'] || '/';
        return router.createUrlTree([redirectTo]);
      }
      return true;
    })
  );
};
