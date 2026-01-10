import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { HeaderService } from '@services/header/header';
import { ExtraPaymentService } from '@services/extra-payment/extra-payment';
import { ExtraPayment } from '@models/extra-payment';

@Component({
  selector: 'app-extra-payment-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './detail.html',
})
export class ExtraPaymentDetail implements OnInit {
  @Input() id?: string;

  private _headerService = inject(HeaderService);
  private _service = inject(ExtraPaymentService);

  payment = signal<ExtraPayment | null>(null);
  loading = signal(true);

  ngOnInit() {
    this._headerService.reset();
    this._headerService.header_text.set('Detalle de Pago');
    this._headerService.size.set('normal');
    this._headerService.is_logo.set(false);
    this._headerService.buttons_on.set(true);

    if (this.id) {
      this.loadData(Number(this.id));
    }
  }

  loadData(id: number) {
    this._service.getById(id).subscribe({
      next: res => {
        this.payment.set(res.data);
        this._headerService.header_text.set('Pagos Extras');
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
