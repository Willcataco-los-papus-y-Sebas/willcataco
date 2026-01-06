import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth/auth-guard';
import { guestGuard } from '@guards/guest/guest-guard';
import { Login } from '@pages/login/login';
import { AdminLogin } from '@pages/admin/login/login';
import { Home } from '@pages/home/home';
import { Dashboard } from '@pages/admin/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    data: { redirectTo: '/' },
    component: Login,
  },
  {
    path: 'admin/login',
    canActivate: [guestGuard],
    data: { redirectTo: '/admin' },
    component: AdminLogin,
  },
  {
    path: '',
    canActivate: [authGuard],
    component: Home,
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: Dashboard,
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
