import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth/auth-guard';
import { guestGuard } from '@guards/guest/guest-guard';
import { Login } from '@pages/login';
import { AdminLogin } from '@pages/admin/login';
import { Home } from '@pages/home';
import { Dashboard } from '@pages/admin/dashboard';
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
    canActivate: [authGuard],
    component: Dashboard,
    children: [
      {
        path: 'socios',
        loadComponent: () => import('./pages/admin/members/members').then(m => m.Members),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
