import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '@components/button/button';
import { InputComponent } from '@components/input/input';
import { ModalComponent } from '@components/modal/modal';

import { HeaderService } from '@services/header/header';
import { ToastService } from '@services/toast/toast.service';
import { ExtraPaymentService } from '@services/extra-payment/extra-payment';
import { ExtraPayment } from '@models/extra-payment';

@Component({
  selector: 'app-extra-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ModalComponent],
  templateUrl: './extra-payments.html',
  styleUrl: './extra-payments.css',
})
export class ExtraPayments implements OnInit {
  private _headerService = inject(HeaderService);
  private _extraPaymentService = inject(ExtraPaymentService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);

  payments = signal<ExtraPayment[] | null>(null);

  totalPayments = signal(0);
  currentDate = new Date();

  limit = 10;
  offset = 0;
  currentPage = signal(1);
  hasMore = signal(true);

  searchTerm = signal('');

  isModalOpen = signal(false);
  isEditing = signal(false);
  selectedPaymentId = signal<number | null>(null);

  isDeleteModalOpen = signal(false);
  paymentToDelete = signal<ExtraPayment | null>(null);

  formName = signal('');
  formDescription = signal('');
  formAmount = signal('');

  ngOnInit() {
    this.setupHeader();
    this.loadPayments();
  }

  setupHeader() {
    this._headerService.reset();
    this._headerService.header_text.set('Pagos Extras');
    this._headerService.is_logo.set(false);
    this._headerService.buttons_on.set(true);
  }

  loadPayments() {
    this._extraPaymentService.getAll(this.limit, this.offset).subscribe({
      next: res => {
        this.payments.set(res.data);

        if (res.data.length < this.limit) {
          this.hasMore.set(false);
        } else {
          this.hasMore.set(true);
        }

        if (this.offset === 0 && this.totalPayments() === 0) {
          this.totalPayments.set(res.data.length);
        }
      },
      error: err => {
        console.error(err);
        this._toastService.error('Error al cargar pagos');
      },
    });
  }

  goToDetail(id: number) {
    this._router.navigate(['/admin/extra-payments', id]);
  }

  openCreateModal() {
    this.isEditing.set(false);
    this.resetForm();
    this.isModalOpen.set(true);
  }

  openEditModal(payment: ExtraPayment) {
    this.isEditing.set(true);
    this.selectedPaymentId.set(payment.id);
    this.formName.set(payment.name);
    this.formDescription.set(payment.description || '');
    this.formAmount.set(payment.amount.toString());
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.formName.set('');
    this.formDescription.set('');
    this.formAmount.set('');
    this.selectedPaymentId.set(null);
  }

  submitForm() {
    const description = this.formDescription();
    const amount = parseFloat(this.formAmount()) || 0;

    if (this.isEditing() && this.selectedPaymentId()) {
      const payload = {
        description: description,
        amount: amount,
      };

      this._extraPaymentService.update(this.selectedPaymentId()!, payload).subscribe({
        next: () => {
          this._toastService.success('Pago actualizado correctamente');
          this.loadPayments();
          this.closeModal();
        },
        error: e => {
          console.error(e);
          this._toastService.error('Error al actualizar pago');
        },
      });
    } else {
      const payload = {
        name: this.formName(),
        description: description,
        amount: amount,
      };

      this._extraPaymentService.create(payload).subscribe({
        next: () => {
          this._toastService.success('Pago creado correctamente');
          this.loadPayments();
          this.closeModal();
        },
        error: e => {
          console.error(e);
          this._toastService.error('Error al crear pago');
        },
      });
    }
  }

  confirmDelete(payment: ExtraPayment) {
    this.paymentToDelete.set(payment);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.paymentToDelete.set(null);
  }

  deletePayment() {
    const payment = this.paymentToDelete();
    if (!payment) return;

    this._extraPaymentService.delete(payment.id).subscribe({
      next: () => {
        this._toastService.success('Pago eliminado');
        this.closeDeleteModal();
        this.loadPayments();
      },
      error: () => this._toastService.error('Error al eliminar'),
    });
  }

  nextPage() {
    if (this.hasMore()) {
      this.offset += this.limit;
      this.currentPage.update(v => v + 1);
      this.loadPayments();
    }
  }

  prevPage() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.currentPage.update(v => v - 1);
      this.loadPayments();
      this.hasMore.set(true);
    }
  }
}
