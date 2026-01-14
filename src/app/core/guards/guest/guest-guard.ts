import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth/auth';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.loading).pipe(
    filter(loading => !loading),
    take(1),
    map(() => {
      if (auth.isAuthenticated()) {
        const user = auth.user();
        
        if (user?.scope === 'internal') {
          return router.createUrlTree(['/admin']);
        }
        
        if (user?.scope === 'member') {
          return router.createUrlTree(['/']);
        }
        
        return router.createUrlTree(['/']);
      }
      return true;
    })
  );
};
