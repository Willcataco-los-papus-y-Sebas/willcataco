import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WaterPaymentsService } from '@services/water-payments/water-payments.service';
import { MembersService } from '@services/members/members.service';
import { WaterPayment } from '@models/water-payments/water-payment.types';
import { Member } from '@models/members/member.types';
import { HeaderComponent } from '@components/header/header';
import { StatusBadgeComponent } from '@components/status-badge/status-badge';

@Component({
    selector: 'app-member-payments',
    standalone: true,
    imports: [CommonModule, HeaderComponent, StatusBadgeComponent],
    templateUrl: './payments.html',
    styleUrl: './payments.css',
})
export class MemberPaymentsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private waterPaymentsService = inject(WaterPaymentsService);
    private membersService = inject(MembersService);

    memberId = signal<number | null>(null);
    member = signal<Member | null>(null);
    payments = signal<WaterPayment[]>([]);
    activeTab = signal<'PAID' | 'UNPAID'>('UNPAID'); // Default to Debts as per typical use case? Or 'PAID' (Hechas)?
    // Mockup shows "Hechas" and "Deudas". Let's use those terms.

    // Computed properties
    filteredPayments = computed(() => {
        return this.payments().filter(p => p.status === this.activeTab());
    });

    totalDebt = computed(() => {
        return this.payments()
            .filter(p => p.status === 'UNPAID')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
    });

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                const numId = Number(id);
                this.memberId.set(numId);
                this.loadData(numId);
            }
        });
    }

    loadData(id: number) {
        this.waterPaymentsService
            .getWaterPayments(id)
            .subscribe(data => this.payments.set(data));

        this.membersService.getMemberById(id).subscribe(data => {
            this.member.set(data);
        });
    }

    setTab(tab: 'PAID' | 'UNPAID') {
        this.activeTab.set(tab);
    }
}
