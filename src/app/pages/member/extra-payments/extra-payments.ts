import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HeaderService } from '@services/header/header';
import { PaymentConfirmModalComponent } from '@components/payment-confirm-modal';
import { MemberExtraPaymentItem, PaymentDetail } from '@models/members';

const MOCK_EXTRA_PAYMENTS: MemberExtraPaymentItem[] = [
  {
    id: 1,
    name: 'Mantenimiento de red',
    description: 'Cuota extraordinaria para mantenimiento de la red de distribución',
    amount: 50,
    status: 'UNPAID',
    createdAt: '2026-01-15',
    dueDate: '2026-03-15',
  },
  {
    id: 2,
    name: 'Ampliación de tanque',
    description: 'Aporte para la ampliación del tanque de almacenamiento',
    amount: 100,
    status: 'UNPAID',
    createdAt: '2026-01-10',
    dueDate: '2026-04-01',
  },
  {
    id: 3,
    name: 'Reunión general',
    description: 'Multa por inasistencia a la reunión general de socios',
    amount: 20,
    status: 'PAID',
    createdAt: '2025-12-01',
    dueDate: '2025-12-31',
  },
  {
    id: 4,
    name: 'Reparación de tubería',
    description: 'Cuota para reparación de tubería zona norte',
    amount: 75,
    status: 'PAID',
    createdAt: '2025-11-05',
    dueDate: '2025-12-15',
  },
];

@Component({
  selector: 'app-member-extra-payments',
  standalone: true,
  imports: [DatePipe, PaymentConfirmModalComponent],
  templateUrl: './extra-payments.html',
  styleUrl: './extra-payments.css',
})
export class MemberExtraPayments implements OnInit {
  private readonly headerService = inject(HeaderService);

  readonly selectedPayment = signal<MemberExtraPaymentItem | null>(null);
  readonly showConfirmModal = signal(false);

  readonly payments = signal<MemberExtraPaymentItem[]>(MOCK_EXTRA_PAYMENTS);

  readonly unpaidPayments = computed(() => this.payments().filter(p => p.status === 'UNPAID'));

  readonly paidPayments = computed(() => this.payments().filter(p => p.status === 'PAID'));

  readonly totalUnpaid = computed(() =>
    this.unpaidPayments().reduce((sum, p) => sum + p.amount, 0)
  );

  readonly modalDetails = computed<PaymentDetail[]>(() => {
    const payment = this.selectedPayment();
    if (!payment) return [];
    const formattedDate = new Date(payment.dueDate + 'T00:00:00').toLocaleDateString('es-BO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return [
      { label: 'Concepto', value: payment.name },
      { label: 'Descripción', value: payment.description, fullWidth: true },
      { label: 'Vencimiento', value: formattedDate },
    ];
  });

  readonly modalAmount = computed(() => this.selectedPayment()?.amount ?? 0);

  ngOnInit(): void {
    this.headerService.reset();
    this.headerService.header_text.set('Pagos Extras');
    this.headerService.is_logo.set(false);
  }

  selectPayment(payment: MemberExtraPaymentItem): void {
    if (payment.status === 'UNPAID') {
      this.selectedPayment.set(payment);
      this.showConfirmModal.set(true);
    }
  }

  closeModal(): void {
    this.showConfirmModal.set(false);
    this.selectedPayment.set(null);
  }

  confirmPayment(): void {
    // TODO: Integrate with backend
    this.closeModal();
  }
}
