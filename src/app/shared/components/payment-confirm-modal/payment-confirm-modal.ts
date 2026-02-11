import { Component, input, output } from '@angular/core';
import { ModalComponent } from '@components/modal/modal';
import { ButtonComponent } from '@components/button/button';
import { PaymentDetail } from '@models/members';

@Component({
  selector: 'app-payment-confirm-modal',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './payment-confirm-modal.html',
  styleUrl: './payment-confirm-modal.css',
})
export class PaymentConfirmModalComponent {
  readonly isOpen = input(false);
  readonly title = input('Confirmar pago');
  readonly details = input<PaymentDetail[]>([]);
  readonly totalAmount = input(0);
  readonly confirmText = input('Pagar ahora');
  readonly cancelText = input('Cancelar');
  readonly loading = input(false);

  readonly paymentConfirmed = output<void>();
  readonly paymentCancelled = output<void>();

  onCancel(): void {
    this.paymentCancelled.emit();
  }

  onConfirm(): void {
    this.paymentConfirmed.emit();
  }
}
