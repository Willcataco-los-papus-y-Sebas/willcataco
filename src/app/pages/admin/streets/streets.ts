import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@components/button/button';
import { ModalComponent } from '@components/modal/modal';
import { InputComponent } from '@components/input/input';
import { KebabComponent } from '@components/kebab/kebab';
import { KebabOption } from '@components/kebab/kebab.types';
import { CardStreet } from './components/card-street/card-street';

import { Street } from '@models/streets';
import { StreetService } from '@services/street/street';
import { HeaderService } from '@services/header';
import { ToastService } from '@services/toast/toast.service';

@Component({
  selector: 'app-streets',
  imports: [
    FormsModule,
    ButtonComponent,
    ModalComponent,
    InputComponent,
    KebabComponent,
    CardStreet,
  ],
  templateUrl: './streets.html',
  styleUrl: './streets.css',
})
export class Streets implements OnInit {
  private headerService = inject(HeaderService);
  private toastService = inject(ToastService);
  private streetService = inject(StreetService);

  nameStreet = signal('');
  streets = signal<Street[]>([]);
  selectedStreetId = signal<number | null>(null);
  selectedStreet = signal<Street | null>(null);

  loading = signal(false);
  isModalOpen = signal<boolean>(false);
  isEditMode = signal(false);
  isDeleteModal = signal<boolean>(false);

  private currentOffset = 0;
  private readonly pageSize = 10;
  hasMore = signal(true);

  private isLoadingMore = false;
  private lastScrollPosition = 0;
  private scrollThrottleTimer: number | null = null;

  kebabOptions: KebabOption[] = [
    { label: 'Editar', action: 'edit' },
    { label: 'Eliminar', action: 'delete', variant: 'danger' },
  ];

  ngOnInit(): void {
    this.headerService.is_logo.set(false);
    this.headerService.header_text.set('Gestionamiento de nuestras calles');
    this.getStreets();
  }

  handleActions(action: string, street: Street) {
    if (action === 'edit') {
      this.editStreet(street);
    } else if (action === 'delete') {
      this.openDeleteModal(street);
    }
  }

  openDeleteModal(street: Street) {
    this.selectedStreet.set(street);
    this.selectedStreetId.set(street.id);
    this.isDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModal.set(false);
    this.selectedStreet.set(null);
    this.selectedStreetId.set(null);
  }

  deleteStreet() {
    this.loading.set(true);
    this.streetService.delete(this.selectedStreetId()!).subscribe({
      next: () => {
        this.toastService.success('Calle eliminada correctamente');
        this.closeDeleteModal();
        this.reloadStreets();
      },
      error: err => {
        console.error('Error al eliminar calle:', err);
        const errorDetail = err.error?.detail;
        this.toastService.error(errorDetail || 'No se pudo eliminar la calle');
        this.loading.set(false);
      },
    });
  }

  openModal() {
    this.isModalOpen.set(true);
    this.isEditMode.set(false);
    this.selectedStreetId.set(null);
    this.nameStreet.set('');
  }

  editStreet(street: Street) {
    this.isEditMode.set(true);
    this.selectedStreetId.set(street.id);
    this.nameStreet.set(street.name);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.nameStreet.set('');
    this.isEditMode.set(false);
    this.selectedStreetId.set(null);
  }

  registerStreet() {
    if (!this.validateStreetName()) {
      return;
    }

    const streetInput = { name: this.nameStreet() };

    if (this.isEditMode() && this.selectedStreetId()) {
      this.updatedStreet(streetInput);
    } else {
      this.createStreet(streetInput);
    }
  }

  private validateStreetName() {
    if (!this.nameStreet().trim()) {
      this.toastService.warning('Por favor ingrese un nombre');
      return false;
    }
    return true;
  }

  private createStreet(street: { name: string }) {
    this.streetService.create(street).subscribe({
      next: () => {
        this.toastService.success('Calle registrada con exito');
        this.reloadStreets();
        this.nameStreet.set('');
        this.closeModal();
      },
      error: err => {
        if (err.error?.detail === 'Street already exist') {
          this.toastService.error('La calle ya existe');
        } else {
          this.toastService.error('La calle no se pudo crear');
        }
      },
    });
  }

  private updatedStreet(street: { name: string }) {
    this.streetService.update(this.selectedStreetId()!, street).subscribe({
      next: () => {
        this.toastService.success('Calle actualizada correctamente');
        this.reloadStreets();
        this.closeModal();
      },
      error: err => {
        if (err.error?.detail === 'Street already exist') {
          this.toastService.error('La calle ya existe');
        } else {
          this.toastService.error('La calle no se pudo editar');
        }
      },
    });
  }

  getStreets() {
    if (this.isLoadingMore || !this.hasMore()) {
      return;
    }
    this.loading.set(true);
    this.isLoadingMore = true;

    this.streetService.getAll(this.pageSize, this.currentOffset).subscribe({
      next: response => {
        this.streets.update(current => [...current, ...response.data]);
        this.currentOffset += this.pageSize;
        this.hasMore.set(response.data.length === this.pageSize);
        this.loading.set(false);

        setTimeout(() => {
          this.loading.set(false);
          this.isLoadingMore = false;
        }, 300);
      },
      error: () => {
        this.toastService.error('No se pudieron cargar las calles');
        this.loading.set(false);
        this.isLoadingMore = false;
      },
    });
  }

  onScroll(event: Event) {
    if (!this.hasMore() || this.isLoadingMore) {
      return;
    }

    if (this.scrollThrottleTimer) {
      return;
    }

    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;

    if (scrollTop <= this.lastScrollPosition) {
      this.lastScrollPosition = scrollTop;
      return;
    }

    const isBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1;

    if (isBottom && this.hasMore() && !this.loading()) {
      this.scrollThrottleTimer = setTimeout(() => {
        this.scrollThrottleTimer = null;
      }, 500);

      this.getStreets();
    }
  }

  reloadStreets() {
    this.streets.set([]);
    this.currentOffset = 0;
    this.hasMore.set(true);
    this.getStreets();
  }
}
