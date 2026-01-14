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
import { Reset } from '@pages/reset/reset';
import { Forget } from '@pages/forget/forget';
import { ExtraPayments } from '@pages/admin/extra-payments';
import { ExtraPaymentDetail } from '@pages/admin/extra-payments/detail';
import { Streets } from '@pages/admin/streets';
import { Actions } from '@pages/admin/actions';
import { ActionDetail } from '@pages/admin/actions/detail/';
import { NewMembers } from '@pages/admin/new-members/new-members';

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
    path: 'admin',
    canActivate: [guestGuard],
    data: { redirectTo: '/dashboard' },
    component: MainLayout,
    children: [
      {
        path: '',
        component: AdminLogin,
      },
    ],
  },
  {
    path: 'streets',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Streets,
      },
    ],
  },
  {
    path: 'new-members',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: NewMembers,
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
    path: 'actions',
    canActivate: [authGuard, scopeGuard, roleGuard],
    data: { scope: 'internal', roles: ['admin', 'staff'] },
    component: MainLayout,
    children: [
      {
        path: '',
        component: Actions,
      },
      {
        path: ':id',
        component: ActionDetail,
      },
    ],
  },
  {
    path: 'extra-payments',
    canActivate: [authGuard, scopeGuard, roleGuard],
    data: { scope: 'internal', roles: ['admin', 'staff'] },
    component: MainLayout,
    children: [
      {
        path: '',
        component: ExtraPayments,
      },
      {
        path: ':id',
        component: ExtraPaymentDetail,
      },
    ],
  },
  {
    path: 'dashboard',
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
    path: 'password',
    canActivate: [guestGuard],
    data: { redirectTo: '/' },
    component: MainLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/',
      },
      {
        path: 'forget',
        component: Forget,
      },
      {
        path: 'reset',
        component: Reset,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
