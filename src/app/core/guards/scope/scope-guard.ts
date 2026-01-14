import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth/auth';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { UserScope } from '@models/auth';

export const scopeGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredScope = route.data?.['scope'] as UserScope;

  if (!requiredScope) {
    return true;
  }

  return toObservable(auth.loading).pipe(
    filter(loading => !loading),
    take(1),
    map(() => {
      const user = auth.user();

      if (!user) {
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      }

      if (user.scope === requiredScope) {
        return true;
      }

      if (user.scope === 'member' && requiredScope === 'internal') {
        return router.createUrlTree(['/']);
      }

      if (user.scope === 'internal' && requiredScope === 'member') {
        return router.createUrlTree(['/admin']);
      }

      return false;
    })
  );
};
