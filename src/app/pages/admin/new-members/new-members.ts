import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputComponent } from '@components/input/input';
import { ButtonComponent } from '@components/button/button';
import { ModalComponent } from '@components/modal/modal';

import { MemberService } from '@services/new-members/new-members';
import { HeaderService } from '@services/header';
import { ToastService } from '@services/toast/toast.service';

@Component({
  selector: 'app-new-members',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, ModalComponent],
  templateUrl: './new-members.html',
  styleUrl: './new-members.css',
})
export class NewMembers implements OnInit {
  private _headerService = inject(HeaderService);
  private _memberService = inject(MemberService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);

  name = signal('');
  lastName = signal('');
  ci = signal('');
  phone = signal('');
  userId = signal('');

  loading = signal(false);
  isConfirmModalOpen = signal(false);

  ngOnInit() {
    this.setupHeader();
  }

  setupHeader() {
    this._headerService.reset();
    this._headerService.header_text.set('Nuevo Socio');
    this._headerService.is_logo.set(false);
    this._headerService.buttons_on.set(true);
    this._headerService.is_carrusel = signal(false);
  }

  validateForm(): boolean {
    if (!this.name() || !this.lastName() || !this.ci() || !this.phone() || !this.userId()) {
      this._toastService.warning('Complete todos los campos obligatorios');
      return false;
    }
    return true;
  }

  openConfirmModal() {
    if (this.validateForm()) {
      this.isConfirmModalOpen.set(true);
    }
  }

  closeConfirmModal() {
    this.isConfirmModalOpen.set(false);
  }

  createMember() {
    this.loading.set(true);
    this.closeConfirmModal();

    const payload = {
      name: this.name(),
      last_name: this.lastName(),
      ci: this.ci(),
      phone: this.phone(),
      user_id: Number(this.userId()),
    };

    this._memberService.create(payload).subscribe({
      next: () => {
        this._toastService.success('Socio creado exitosamente');
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        const errorMsg = err.error?.detail || 'Error al crear socio';
        this._toastService.error(errorMsg);
        this.loading.set(false);
      },
    });
  }
}
