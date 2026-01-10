import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@components/button/button';
import { InputComponent } from '@components/input/input';
import { ModalComponent } from '@components/modal/modal';

import { HeaderService } from '@services/header/header';
import { ToastService } from '@services/toast/toast.service';
import { ActionService } from 'src/app/core/services/actions/actions';
import { Action } from '@models/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    ModalComponent,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions implements OnInit {
  private _headerService = inject(HeaderService);
  private _actionService = inject(ActionService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);

  actions = signal<Action[]>([]);
  totalActions = signal(0);
  loading = signal(false);
  currentDate = new Date();

  limit = 10;
  offset = 0;
  currentPage = signal(1);
  hasMore = signal(true);

  isModalOpen = signal(false);
  isEditing = signal(false);
  isDeleteModalOpen = signal(false);

  selectedActionId = signal<number | null>(null);
  actionToDelete = signal<Action | null>(null);

  formMemberId = signal('');
  formStreetId = signal('');
  formPrice = signal('');

  ngOnInit() {
    this.setupHeader();
    this.loadActions();
  }

  setupHeader() {
    this._headerService.reset();
    this._headerService.header_text.set('Acciones de Medidores');
    this._headerService.is_logo.set(false);
    this._headerService.buttons_on.set(true);
  }

  goToDetail(id: number) {
    console.log('Navegando a detalle ID:', id);
    this._router.navigate(['/admin/actions', id]);
  }

  loadActions() {
    this.loading.set(true);
    this._actionService.getAll(this.limit, this.offset).subscribe({
      next: res => {
        this.actions.set(res.data);
        this.hasMore.set(res.data.length >= this.limit);

        if (this.offset === 0) {
          this.totalActions.set(res.data.length);
        }
        this.loading.set(false);
      },
      error: () => {
        this._toastService.error('Error al cargar acciones');
        this.loading.set(false);
      },
    });
  }

  openCreateModal() {
    this.isEditing.set(false);
    this.resetForm();
    this.isModalOpen.set(true);
  }

  openEditModal(action: Action) {
    this.isEditing.set(true);
    this.selectedActionId.set(action.id);
    this.formMemberId.set(action.member_id.toString());
    this.formStreetId.set(action.street_id.toString());
    this.formPrice.set(action.total_price.toString());

    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.formMemberId.set('');
    this.formStreetId.set('');
    this.formPrice.set('');
    this.selectedActionId.set(null);
  }

  submitForm() {
    const memberId = parseInt(this.formMemberId());
    const streetId = parseInt(this.formStreetId());
    const price = parseFloat(this.formPrice());

    if (!memberId || !streetId || isNaN(price)) {
      this._toastService.warning('Complete todos los campos correctamente');
      return;
    }

    const payload = {
      member_id: memberId,
      street_id: streetId,
      total_price: price,
    };

    if (this.isEditing() && this.selectedActionId()) {
      this._actionService.update(this.selectedActionId()!, payload).subscribe({
        next: () => {
          this._toastService.success('Acción actualizada correctamente');
          this.loadActions();
          this.closeModal();
        },
        error: () => this._toastService.error('Error al actualizar'),
      });
    } else {
      this._actionService.create(payload).subscribe({
        next: () => {
          this._toastService.success('Acción creada correctamente');
          this.loadActions();
          this.closeModal();
        },
        error: () => this._toastService.error('Error al crear'),
      });
    }
  }

  confirmDelete(action: Action) {
    this.actionToDelete.set(action);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.actionToDelete.set(null);
  }

  deleteAction() {
    const action = this.actionToDelete();
    if (!action) return;

    this._actionService.delete(action.id).subscribe({
      next: () => {
        this._toastService.success('Acción eliminada');
        this.closeDeleteModal();
        this.loadActions();
      },
      error: () => this._toastService.error('Error al eliminar'),
    });
  }

  nextPage() {
    if (this.hasMore()) {
      this.offset += this.limit;
      this.currentPage.update(v => v + 1);
      this.loadActions();
    }
  }

  prevPage() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.currentPage.update(v => v - 1);
      this.loadActions();
      this.hasMore.set(true);
    }
  }
}
