import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '@services/header';
import { DirectAccessComponent } from '@components/direct-access';

interface DashboardCard {
  report_text: string;
  icon: string;
  access_text: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DirectAccessComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private headerService = inject(HeaderService);

  cards: DashboardCard[] = [
    {
      report_text: '400 socios activos',
      icon: 'people',
      access_text: 'Administrar Socios',
      route: '/members',
    },
    {
      report_text: '30 pagos pendientes',
      icon: 'payment',
      access_text: 'Pagos presenciales',
      route: '/extra-payments',
    },
    {
      report_text: '40 socios sin lecturar este mes',
      icon: 'edit',
      access_text: 'Generar lecturador',
      route: '/actions',
    },
    {
      report_text: 'Periodo Diciembre 2025',
      icon: 'calendar',
      access_text: 'Reportes cobro',
      route: '/extra-payments',
    },
    {
      report_text: '8 cuentas mesa',
      icon: 'people',
      access_text: 'Administrar Mesa',
      route: '/users',
    },
  ];

  ngOnInit() {
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.buttons_on.set(true);
    this.headerService.header_text.set('Willcataco');
    this.headerService.is_normal.set(false);
    this.headerService.is_carrusel.set(false);
    this.headerService.has_wave.set(true);
  }
}
