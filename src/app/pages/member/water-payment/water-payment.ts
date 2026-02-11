import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HeaderService } from '@services/header/header';
import { PaymentConfirmModalComponent } from '@components/payment-confirm-modal';
import { PaymentDetail } from '@models/members';
import { WaterBill } from '@models/members';

const MOCK_WATER_BILLS: WaterBill[] = [
  {
    id: 1,
    period: 'Febrero 2026',
    amount: 35,
    previousReading: 1245,
    currentReading: 1268,
    consumption: 23,
    status: 'UNPAID',
    dueDate: '2026-02-28',
  },
  {
    id: 2,
    period: 'Enero 2026',
    amount: 35,
    previousReading: 1220,
    currentReading: 1245,
    consumption: 25,
    status: 'UNPAID',
    dueDate: '2026-01-31',
  },
  {
    id: 3,
    period: 'Diciembre 2025',
    amount: 30,
    previousReading: 1198,
    currentReading: 1220,
    consumption: 22,
    status: 'PAID',
    dueDate: '2025-12-31',
  },
  {
    id: 4,
    period: 'Noviembre 2025',
    amount: 28,
    previousReading: 1175,
    currentReading: 1198,
    consumption: 23,
    status: 'PAID',
    dueDate: '2025-11-30',
  },
];

@Component({
  selector: 'app-member-water-payment',
  standalone: true,
  imports: [DatePipe, PaymentConfirmModalComponent],
  templateUrl: './water-payment.html',
  styleUrl: './water-payment.css',
})
export class MemberWaterPayment implements OnInit {
  private readonly headerService = inject(HeaderService);

  readonly selectedBill = signal<WaterBill | null>(null);
  readonly showConfirmModal = signal(false);

  readonly bills = signal<WaterBill[]>(MOCK_WATER_BILLS);

  readonly unpaidBills = computed(() =>
    this.bills().filter(b => b.status === 'UNPAID')
  );

  readonly paidBills = computed(() =>
    this.bills().filter(b => b.status === 'PAID')
  );

  readonly totalUnpaid = computed(() =>
    this.unpaidBills().reduce((sum, b) => sum + b.amount, 0)
  );

  readonly modalDetails = computed<PaymentDetail[]>(() => {
    const bill = this.selectedBill();
    if (!bill) return [];
    return [
      { label: 'Periodo', value: bill.period },
      { label: 'Consumo', value: `${bill.consumption} m³` },
      { label: 'Lectura', value: `${bill.previousReading} → ${bill.currentReading}` },
    ];
  });

  readonly modalAmount = computed(() => this.selectedBill()?.amount ?? 0);

  ngOnInit(): void {
    this.headerService.reset();
    this.headerService.header_text.set('Pago de Agua');
    this.headerService.is_logo.set(false);
  }

  selectBill(bill: WaterBill): void {
    if (bill.status === 'UNPAID') {
      this.selectedBill.set(bill);
      this.showConfirmModal.set(true);
    }
  }

  closeModal(): void {
    this.showConfirmModal.set(false);
    this.selectedBill.set(null);
  }

  confirmPayment(): void {
    // TODO: Integrate with backend
    this.closeModal();
  }
}
