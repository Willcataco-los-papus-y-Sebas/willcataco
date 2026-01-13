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

@Component({
    selector: 'app-member-payments',
    standalone: true,
    imports: [CommonModule, HeaderComponent, StatusBadgeComponent],
    templateUrl: './payments.html',
    styleUrl: './payments.css',
})
export class MemberPaymentsComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private waterPaymentsService = inject(WaterPaymentsService);
    private membersService = inject(MembersService);
    private headerService = inject(HeaderService);

    memberId = signal<number | null>(null);
    member = signal<Member | null>(null);
    payments = signal<WaterPayment[]>([]);
    activeTab = signal<'PAID' | 'UNPAID'>('UNPAID');

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
                this.loadData(numId);
            }
        });
    }

    ngOnDestroy() {
        this.headerService.reset();
    }

    loadData(id: number) {
        this.waterPaymentsService
            .getWaterPayments(id)
            .subscribe({
                next: (data) => {
                    this.payments.set(data);
                    this.updateHeaderCarousel();
                },
                error: (err) => console.error('Error loading payments:', err)
            });

        this.membersService.getMemberById(id).subscribe(data => {
            this.member.set(data);
            this.headerService.header_text.set(`${data.name} ${data.last_name}`);
        });
    }

    updateHeaderCarousel() {
        const debt = this.totalDebt();
        this.headerService.is_normal.set(false);
        this.headerService.is_carrusel.set(true);
        this.headerService.carrusel_items.set([
            {
                id: 0,
                title: 'Monto a Pagar',
                subtitle: `Bs. ${debt}`,
                footPage: 'Total Deuda Acumulada',
            }
        ]);
    }

    setTab(tab: 'PAID' | 'UNPAID') {
        this.activeTab.set(tab);
    }
}
