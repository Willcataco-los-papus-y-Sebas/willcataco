import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth/auth-guard';
import { guestGuard } from '@guards/guest/guest-guard';
import { scopeGuard } from '@guards/scope/scope-guard';
import { roleGuard } from '@guards/role/role-guard';
import { Login } from '@pages/login';
import { AdminLogin } from '@pages/admin/login';
import { Home } from '@pages/home';
import { Dashboard } from '@pages/admin/dashboard';
import { MainLayout } from '@layouts/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    component: MainLayout,
    canActivate: [guestGuard],
    data: { redirectTo: '/' },
    children: [
      {
        path: '',
        component: Login,
      },
    ],
  },
  {
    path: 'admin/login',
    canActivate: [guestGuard],
    data: { redirectTo: '/admin' },
    component: MainLayout,
    children: [
      {
        path: '',
        component: AdminLogin,
      },
    ],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard, scopeGuard],
    data: { scope: 'member' },
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard, scopeGuard, roleGuard],
    data: { scope: 'internal', roles: ['admin', 'staff'] },
    component: MainLayout,
    children: [
      {
        path: '',
        component: Dashboard,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
