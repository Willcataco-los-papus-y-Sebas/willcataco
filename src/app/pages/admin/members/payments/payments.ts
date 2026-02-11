import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WaterPaymentsService } from '@services/water-payments/water-payments.service';
import { MembersService } from '@services/members/members.service';
import { WaterPayment } from '@models/water-payments/water-payment.types';
import { Member } from '@models/members/member.types';
import { HeaderComponent } from '@components/header/header';
import { StatusBadgeComponent } from '@components/status-badge/status-badge';
import { HeaderService } from '@services/header';
import { ButtonComponent } from '@components/button/button';
import { Carrusel } from '@components/carrusel/carrusel';
import { ICarruselItem } from '@models/carrusel/carrusel.item.types';
import { Status } from '@models/status/status.enum';

@Component({
  selector: 'app-member-payments',
  standalone: true,
  imports: [CommonModule, HeaderComponent, StatusBadgeComponent, Carrusel, ButtonComponent],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class MemberPaymentsComponent implements OnInit, OnDestroy {
  Status = Status;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private waterPaymentsService = inject(WaterPaymentsService);
  private membersService = inject(MembersService);
  private headerService = inject(HeaderService);

  memberId = signal<number | null>(null);
  member = signal<Member | null>(null);
  payments = signal<WaterPayment[]>([]);
  activeTab = signal<'PAID' | 'UNPAID'>('UNPAID');
  carruselItems = signal<ICarruselItem[]>([]);

  limit = 20;
  offset = 0;
  isLoading = signal(false);
  hasMore = signal(true);

  filteredPayments = computed(() => {
    return this.payments().filter(p => p.status === this.activeTab());
  });

  totalDebt = computed(() => {
    return this.payments()
      .filter(p => p.status === 'UNPAID')
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
  });

  ngOnInit() {
    this.headerService.reset();
    this.headerService.buttons_on.set(true);
    this.headerService.is_logo.set(false);
    this.headerService.logo.set('droplet-fill');
    this.headerService.header_text.set('Cargando...');

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const numId = Number(id);
        this.memberId.set(numId);
        this.loadData(numId, true);
      }
    });
  }

  ngOnDestroy() {
    this.headerService.reset();
  }

  loadData(id: number, reset = false) {
    if (this.isLoading()) return;

    if (reset) {
      this.offset = 0;
      this.hasMore.set(true);
      this.payments.set([]);
    }

    if (!this.hasMore()) return;

    this.isLoading.set(true);

    this.waterPaymentsService.getAll(id, undefined, this.limit, this.offset).subscribe({
      next: data => {
        if (data.length < this.limit) {
          this.hasMore.set(false);
        }

        if (reset) {
          this.payments.set(data);
        } else {
          this.payments.update(p => [...p, ...data]);
        }

        this.offset += this.limit;
        this.updateHeaderCarousel();
        this.isLoading.set(false);
      },
      error: err => {
        console.error('Error loading payments:', err);
        this.isLoading.set(false);
      },
    });

    if (reset) {
      this.membersService.getById(id).subscribe(data => {
        this.member.set(data);
        this.headerService.header_text.set(`${data.name} ${data.last_name}`);
      });
    }
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    // Buffer of 50px
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
      const id = this.memberId();
      if (id) {
        this.loadData(id);
      }
    }
  }

  updateHeaderCarousel() {
    const debt = this.totalDebt();
    //this.headerService.is_normal.set(false);
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'short' });
    const formattedDate = `${month.charAt(0).toUpperCase() + month.slice(1)}, ${date.getFullYear()}`;

    this.carruselItems.set([
      {
        id: 0,
        title: `Bs. ${debt}`,
        subtitle: 'Monto a Pagar',
        footPage: formattedDate,
      },
    ]);
  }

  setTab(tab: 'PAID' | 'UNPAID') {
    this.activeTab.set(tab);
  }
}
