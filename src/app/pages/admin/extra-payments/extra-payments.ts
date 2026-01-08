import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from '@components/input/input';
import { ButtonComponent } from '@components/button/button';
import { KebabComponent } from '@components/kebab/kebab';
import { ModalComponent } from '@components/modal/modal';
import { KebabOption } from '@components/kebab/kebab.types';

import { HeaderService } from '@services/header/header';
import { ExtraPaymentService } from '@services/extra-payment/extra-payment';
import { ExtraPayment } from '@models/extra-payment';

@Component({
  selector: 'app-extra-payments',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    InputComponent, 
    ButtonComponent, 
    KebabComponent, 
    ModalComponent
  ],
  templateUrl: './extra-payments.html',
  styleUrls: ['./extra-payments.css'],
})
export class ExtraPayments implements OnInit {
  private _headerService = inject(HeaderService);
  private _paymentService = inject(ExtraPaymentService);

  payments = signal<ExtraPayment[]>([]);
  loading = signal<boolean>(false);
  
  isModalOpen = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  selectedPaymentId = signal<number | null>(null);

  formName = signal('');
  formDescription = signal('');
  formAmount = signal('');
  formIsActive = signal(true);

  kebabOptions: KebabOption[] = [
    { label: 'Editar', action: 'edit' },
    { label: 'Eliminar', action: 'delete', variant: 'danger' }
  ];

  ngOnInit() {
    this.setupHeader();
    this.loadPayments();
  }

  setupHeader() {
    this._headerService.reset();
    this._headerService.header_text.set('Pagos Extras');
    this._headerService.size.set('normal');
    this._headerService.buttons_on.set(true);
  }

  loadPayments() {
    this.loading.set(true);
    this._paymentService.getAll().subscribe({
      next: (res) => {
        this.payments.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading payments', err);
        this.loading.set(false);
      }
    });
  }


  openCreateModal() {
    this.isEditMode.set(false);
    this.selectedPaymentId.set(null);
    this.resetForm();
    this.isModalOpen.set(true);
  }

  openEditModal(payment: ExtraPayment) {
    this.isEditMode.set(true);
    this.selectedPaymentId.set(payment.id);
    
    this.formName.set(payment.name);
    this.formDescription.set(payment.description || '');
    this.formAmount.set(payment.amount.toString());
    this.formIsActive.set(payment.is_active);
    
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  resetForm() {
    this.formName.set('');
    this.formDescription.set('');
    this.formAmount.set('');
    this.formIsActive.set(true);
  }

  handleKebabAction(action: string, payment: ExtraPayment) {
    if (action === 'edit') {
      this.openEditModal(payment);
    } else if (action === 'delete') {
      this.deletePayment(payment);
    }
  }

  savePayment() {
    if (!this.formName() || !this.formAmount()) return;

    const payload = {
      name: this.formName(),
      description: this.formDescription(),
      amount: Number(this.formAmount()),
      is_active: this.formIsActive()
    };

    this.loading.set(true);

    if (this.isEditMode() && this.selectedPaymentId()) {
      this._paymentService.update(this.selectedPaymentId()!, payload).subscribe({
        next: () => {
          this.loadPayments();
          this.closeModal();
        },
        error: () => this.loading.set(false)
      });
    } else {
      this._paymentService.create(payload).subscribe({
        next: () => {
          this.loadPayments();
          this.closeModal();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  deletePayment(payment: ExtraPayment) {
    const confirmDelete = confirm(`¿Estás seguro de eliminar "${payment.name}"?`);
    if (!confirmDelete) return;

    this.loading.set(true);
    this._paymentService.delete(payment.id).subscribe({
      next: () => this.loadPayments(),
      error: (e) => {
          console.error(e);
          this.loading.set(false);
      }
    });
  }
}