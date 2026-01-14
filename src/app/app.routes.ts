import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth/auth-guard';
import { guestGuard } from '@guards/guest/guest-guard';

import { Login } from '@pages/login';
import { AdminLogin } from '@pages/admin/login';
import { Home } from '@pages/home';
import { Dashboard } from '@pages/admin/dashboard';
import { Users } from '@pages/admin/users/users';

import { MainLayout } from '@layouts/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    component: MainLayout,
    children: [
      {
        path: '',
        canActivate: [guestGuard],
        data: { redirectTo: '/' },
        component: Login,
      },
    ],
  },
  {
    path: 'admin/login',
    canActivate: [guestGuard],
    data: { redirectTo: '/admin' },
    component: AdminLogin,
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
  {
    path: 'admin',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        component: Users,
      },
      
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
