import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth/auth-guard';
import { guestGuard } from '@guards/guest/guest-guard';
import { Login } from '@pages/login/login';
import { AdminLogin } from '@pages/admin/login/login';
import { Home } from '@pages/home/home';
import { Dashboard } from '@pages/admin/dashboard/dashboard';
import { MainLayout } from '@layouts/main-layout/main-layout';
import { ExtraPayments } from '@pages/admin/extra-payments/extra-payments';
import { ExtraPaymentDetail } from '@pages/admin/extra-payments/detail/detail';

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
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'admin/extra-payments',
        component: ExtraPayments,
      },
      {
        path: 'admin/extra-payments/:id',
        component: ExtraPaymentDetail,
      },
    ],
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
