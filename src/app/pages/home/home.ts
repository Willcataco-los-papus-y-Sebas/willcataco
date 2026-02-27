import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderService } from '@services/header';
import { AuthService } from '@services/auth';
import { PendingPayment } from '@models/members';
import { ToastService } from '@services/toast';
import { WaterMeter } from '@models/water-meter';

const MOCK_WATER_METERS: WaterMeter[] = [
  {
    id: 1,
    reading: 1268,
  },
  /**
  {
    id: 2,
    reading: 1500 
  }
   */
];

const MOCK_PENDING_PAYMENTS: PendingPayment[] = [
  {
    id: 1,
    description: 'Servicio de agua - Febrero 2026',
    amount: 35,
    dueDate: '2026-02-28',
    type: 'water',
    waterMeterId: 1,
  },
  /**{
    id: 5,
    description: 'Servicio de agua - Febrero 2026',
    amount: 100,
    dueDate: '2026-02-28',
    type: 'water',
    waterMeterId: 2,
  },**/
  {
    id: 2,
    description: 'Cuota extraordinaria - Mantenimiento',
    amount: 50,
    dueDate: '2026-03-15',
    type: 'extra',
  },
  {
    id: 3,
    description: 'Servicio de agua - Enero 2026',
    amount: 35,
    dueDate: '2026-01-31',
    type: 'water',
    waterMeterId: 1,
  },
  /**{
    id: 4,
    description: 'Servicio de agua - Enero 2026',
    amount: 70,
    dueDate: '2026-01-31',
    type: 'water',
    waterMeterId: 2,
  },**/
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly headerService = inject(HeaderService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly user = this.authService.user;
  readonly pendingPayments = signal<PendingPayment[]>(MOCK_PENDING_PAYMENTS);
  readonly waterMeters = signal<WaterMeter[]>(MOCK_WATER_METERS);

  readonly totalPending = computed(() =>
    this.pendingPayments().reduce((sum, p) => sum + p.amount, 0)
  );

  ngOnInit(): void {
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.header_text.set('¡Bienvenido!');
    this.headerService.is_normal.set(false);
    this.headerService.has_wave.set(true);
  }

  navigateTo(route: string): void {
    if (route === '/water-payment') {
      this.handleRoutesWater();
    }
    this.router.navigate([route]);
  }

  private handleRoutesWater() {
    const meters = this.waterMeters();

    if (meters.length === 0) {
      this.toast.show('warning', 'Usted no tiene medidores registrados');
      return;
    }

    if (meters.length === 1) {
      this.router.navigate(['/water-payment'], {
        queryParams: { meterId: meters[0].id },
      });
    } else {
      this.router.navigate(['/water-meters']);
    }
  }
}
