import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, UpperCasePipe } from '@angular/common';

import { ButtonComponent } from 'src/app/shared/components/button';
import { KebabComponent } from 'src/app/shared/components/kebab';
import { ModalComponent } from 'src/app/shared/components/modal';
import { InputComponent } from 'src/app/shared/components/input';
import { DropdownComponent } from 'src/app/shared/components/dropdown';
import { DataCardComponent } from 'src/app/shared/components/data-card';
import { KebabOption } from 'src/app/shared/components/kebab/kebab.types';
import { User } from '@models/user';
import { UserRole } from '@enums/user-role';
import { UsersService } from 'src/app/core/services/users/users.service';
import { CreateUserDTO, UpdateUserDTO } from 'src/app/core/services/users/user.types';
import type { DropdownItem } from 'src/app/shared/components/dropdown/dropdown';
import { HeaderService } from '@services/header';

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
    DropdownComponent,
    DataCardComponent,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private headerService = inject(HeaderService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  isLoading = false;

  isModalOpen = false;
  modalMode: ModalMode = null;
  modalTitle = '';
  selectedUser: User | null = null;

  readonly roleOptions: DropdownItem[] = [
    { label: UserRole.ADMIN },
    { label: UserRole.STAFF },
    { label: UserRole.MEMBER },
  ];

  userForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    role: [UserRole.MEMBER, Validators.required],
  });

  kebabOptions: KebabOption[] = [
    { label: 'Ver detalles', action: 'view' },
    { label: 'Editar datos', action: 'edit' },
    { label: 'Desactivar', action: 'delete', variant: 'danger' },
  ];

  ngOnInit(): void {
    this.headerService.reset();
    this.headerService.header_text.set('Gestión de usuarios');
    this.headerService.is_normal.set(true);
    this.headerService.buttons_on.set(true);
    this.headerService.is_logo.set(false);

    setTimeout(() => {
      this.loadUsers();
    }, 0);
  }

  loadUsers(): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.usersService.getUsers().subscribe({
      next: res => {
        this.users = res.data;
        this.applyFilter();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onSearch(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.searchTerm = element.value.toLowerCase().trim();
    this.applyFilter();
  }

  private applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(
        (user: User) =>
          user.username.toLowerCase().includes(this.searchTerm) ||
          user.email.toLowerCase().includes(this.searchTerm)
      );
    }
    this.cdr.detectChanges();
  }

  openCreateModal(): void {
    this.setModalState('create', 'Nuevo usuario');
    this.userForm.reset({ role: UserRole.MEMBER });
    this.setPasswordFieldValidators(true);
    this.userForm.enable();
    this.isModalOpen = true;
  }

  openViewModal(user: User): void {
    this.setModalState('view', 'Detalle de usuario', user);
    this.userForm.patchValue(user);
    this.userForm.disable();
    this.isModalOpen = true;
  }

  openEditModal(user: User): void {
    this.setModalState('edit', 'Editar usuario', user);
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      role: user.role,
      password: '',
    });
    this.setPasswordFieldValidators(false);
    this.userForm.enable();
    this.isModalOpen = true;
  }

  openDeleteModal(user: User): void {
    this.setModalState('delete', 'Desactivar usuario', user);
    this.isModalOpen = true;
  }

  private setModalState(mode: ModalMode, title: string, user: User | null = null): void {
    this.modalMode = mode;
    this.modalTitle = title;
    this.selectedUser = user;
  }

  private setPasswordFieldValidators(isRequired: boolean): void {
    const passwordControl = this.userForm.get('password');
    if (!passwordControl) return;

    const validators = [Validators.minLength(7)];
    if (isRequired) validators.push(Validators.required);

    passwordControl.setValidators(validators);
    passwordControl.updateValueAndValidity();
  }

  closeModal(): void {
    this.isModalOpen = false;
    setTimeout(() => {
      this.modalMode = null;
      this.selectedUser = null;
      this.userForm.reset();
      this.cdr.detectChanges();
    }, 200);
  }

  onRoleSelected(role: string): void {
    this.userForm.get('role')?.setValue(role as UserRole);
    this.userForm.get('role')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.getRawValue() as CreateUserDTO;

    if (this.modalMode === 'create') {
      this.usersService.createUser(formValue).subscribe({
        next: () => this.handleSuccess(),
      });
    }

    if (this.modalMode === 'edit' && this.selectedUser) {
      const payload = this.getChangedValues(this.selectedUser, formValue);
      if (Object.keys(payload).length > 0) {
        this.usersService.updateUser(this.selectedUser.id, payload).subscribe({
          next: () => this.handleSuccess(),
        });
      } else {
        this.closeModal();
      }
    }
  }

  private getChangedValues(original: User, current: CreateUserDTO): UpdateUserDTO {
    const changes: UpdateUserDTO = {};
    if (current.username !== original.username) changes.username = current.username;
    if (current.email !== original.email) changes.email = current.email;
    if (current.role !== original.role) changes.role = current.role;
    if (current.password && current.password.length >= 7) {
      changes.password = current.password;
    }
    return changes;
  }

  private handleSuccess(): void {
    this.loadUsers();
    this.closeModal();
  }

  confirmDelete(): void {
    if (!this.selectedUser) return;
    this.usersService.deleteUser(this.selectedUser.id).subscribe({
      next: () => this.handleSuccess(),
    });
  }

  onKebabAction(action: string, user: User): void {
    const actions: Record<string, (u: User) => void> = {
      view: u => this.openViewModal(u),
      edit: u => this.openEditModal(u),
      delete: u => this.openDeleteModal(u),
    };
    actions[action]?.(user);
  }
}
