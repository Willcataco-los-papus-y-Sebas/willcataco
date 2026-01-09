import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule, UpperCasePipe } from '@angular/common';

import { ButtonComponent } from 'src/app/shared/components/button/button';
import { KebabComponent } from 'src/app/shared/components/kebab/kebab';
import { ModalComponent } from 'src/app/shared/components/modal/modal';
import { InputComponent } from 'src/app/shared/components/input/input';
import { HeaderComponent } from 'src/app/shared/components/header/header';
import { DropdownComponent, DropdownItem } from 'src/app/shared/components/dropdown/dropdown';

import { KebabOption } from 'src/app/shared/components/kebab/kebab.types';
import { User } from '@models/user';
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

  users: User[] = [];
  isModalOpen = false;
  modalMode: ModalMode = null;
  modalTitle = '';
  selectedUser: User | null = null;

  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    role: ['MEMBER', Validators.required],
  });

  kebabOptions: KebabOption[] = [
    { label: 'Ver', action: 'view' },
    { label: 'Editar', action: 'edit' },
    { label: 'Desactivar', action: 'delete', variant: 'danger' },
  ];

  roleOptions: DropdownItem[] = [{ label: 'ADMIN' }, { label: 'STAFF' }, { label: 'MEMBER' }];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: res => (this.users = res.data),
      error: err => console.error('Error al cargar usuarios', err),
    });
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.modalTitle = 'Nuevo usuario';
    this.selectedUser = null;
    this.userForm.reset({ role: 'MEMBER' });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
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
    this.userForm.patchValue({ ...user, password: '' });
    this.userForm.enable();
    this.userForm.get('password')?.clearValidators();
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
    this.userForm.get('role')?.setValue(role);
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const request =
      this.modalMode === 'create'
        ? this.usersService.createUser(this.userForm.value)
        : this.usersService.updateUser(this.selectedUser!.id, this.userForm.value);

    request.subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal();
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
