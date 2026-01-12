import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, UpperCasePipe } from '@angular/common';

import { ButtonComponent } from 'src/app/shared/components/button/button';
import { KebabComponent } from 'src/app/shared/components/kebab/kebab';
import { ModalComponent } from 'src/app/shared/components/modal/modal';
import { InputComponent } from 'src/app/shared/components/input/input';
import { HeaderComponent } from 'src/app/shared/components/header/header';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown';

import { KebabOption } from 'src/app/shared/components/kebab/kebab.types';
import { User, ROLE_COLORS, ROLE_OPTIONS, UserRole } from '@models/user';
import { UsersService } from 'src/app/core/services/users/users.service';

type ModalMode = 'create' | 'edit' | 'view' | 'delete' | null;

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UpperCasePipe,
    ButtonComponent,
    KebabComponent,
    ModalComponent,
    InputComponent,
    HeaderComponent,
    DropdownComponent,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);

  // 🔹 Datos
  users: User[] = [];
  isLoading = false;

  // 🔹 Modal
  isModalOpen = false;
  modalMode: ModalMode = null;
  modalTitle = '';
  selectedUser: User | null = null;

  // 🔹 Shared constants
  readonly roleOptions = ROLE_OPTIONS;
  readonly roleColors = ROLE_COLORS;

  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    role: [UserRole.MEMBER, Validators.required],
  });

  kebabOptions: KebabOption[] = [
    { label: 'Ver', action: 'view' },
    { label: 'Editar', action: 'edit' },
    { label: 'Desactivar', action: 'delete', variant: 'danger' },
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    this.usersService.getUsers().subscribe({
      next: res => {
        this.users = res.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error al cargar usuarios', err);
        this.isLoading = false;
      },
    });
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.modalTitle = 'Nuevo usuario';
    this.selectedUser = null;
    this.userForm.reset({ role: UserRole.MEMBER });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(7)]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.userForm.enable();
    this.isModalOpen = true;
  }

  openViewModal(user: User): void {
    this.modalMode = 'view';
    this.modalTitle = 'Detalle de usuario';
    this.selectedUser = user;
    this.userForm.patchValue(user);
    this.userForm.disable();
    this.isModalOpen = true;
  }

  openEditModal(user: User): void {
    this.modalMode = 'edit';
    this.modalTitle = 'Editar usuario';
    this.selectedUser = user;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      role: user.role,
      password: '',
    });
    this.userForm.enable();

    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.setValidators([Validators.minLength(7)]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.isModalOpen = true;
  }

  openDeleteModal(user: User): void {
    this.modalMode = 'delete';
    this.modalTitle = 'Desactivar usuario';
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalMode = null;
    this.selectedUser = null;
    this.userForm.reset();
  }

  onRoleSelected(role: string): void {
    this.userForm.get('role')?.setValue(role as UserRole);
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const payload = { ...this.userForm.value };

    if (this.modalMode === 'edit' && !payload.password) {
      delete payload.password;
    }

    const request =
      this.modalMode === 'create'
        ? this.usersService.createUser(payload)
        : this.usersService.updateUser(this.selectedUser!.id, payload);

    request.subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal();
      },
      error: err => {
        console.error('Error en la operación:', err);
      },
    });
  }

  confirmDelete(): void {
    if (this.selectedUser) {
      this.usersService.deleteUser(this.selectedUser.id).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
      });
    }
  }

  onKebabAction(action: string, user: User): void {
    if (action === 'view') this.openViewModal(user);
    if (action === 'edit') this.openEditModal(user);
    if (action === 'delete') this.openDeleteModal(user);
  }
}
