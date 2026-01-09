import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@components/button/button';
import { ModalComponent } from '@components/modal/modal';
import { InputComponent } from '@components/input/input';
import { Street } from '@models/streets';
import { StreetService } from '@services/street/street';
import { HeaderService } from '@services/header';
import { ToastService } from '@services/toast/toast.service';
import { KebabComponent } from '@components/kebab/kebab';
import { KebabOption } from '@components/kebab/kebab.types';

@Component({
  selector: 'app-streets',
  imports: [FormsModule, ButtonComponent, ModalComponent, InputComponent, KebabComponent],
  templateUrl: './streets.html',
  styleUrl: './streets.css',
})
export class Streets implements OnInit {
  private headerService = inject(HeaderService);
  private toastService = inject(ToastService);
  private streetService = inject(StreetService);

  name_street = signal('');
  streets = signal<Street[]>([]);
  selectedStreetId = signal<number | null>(null);
  selectedStreet = signal<Street | null>(null);

  loading = signal(false);
  isModalOpen = signal<boolean>(false);
  isEditMode = signal(false);
  isDeleteModal = signal<boolean>(false);

  private current_offset = 0;
  private readonly page_size = 10;
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

  registerStreet() {
    const street_input = { name: this.name_street() };

    if (this.isEditMode() && this.selectedStreetId()) {
      this.streetService.update(this.selectedStreetId()!, street_input).subscribe({
        next: () => {
          this.toastService.success('Calle actualizada');
          this.reloadStreets();
          this.closeModal();
        },
        error: err => {
          console.error('Error al actualizar:', err);
          this.toastService.error('No se pudo actualizar la calle');
        },
      });
    } else {
      this.streetService.create(street_input).subscribe({
        next: () => {
          this.toastService.success('Calle registrada con exito');
          this.reloadStreets();
          this.name_street.set('');
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
  }

  getStreets() {
    if (this.isLoadingMore || !this.hasMore()) {
      return;
    }
    this.loading.set(true);
    this.isLoadingMore = true;

    this.streetService.getAll(this.page_size, this.current_offset).subscribe({
      next: response => {
        this.streets.update(current => [...current, ...response.data]);
        this.current_offset += this.page_size;
        this.hasMore.set(response.data.length === this.page_size);
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

    const is_bottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1;

    if (is_bottom && this.hasMore() && !this.loading()) {
      this.scrollThrottleTimer = setTimeout(() => {
        this.scrollThrottleTimer = null;
      }, 500);

      this.getStreets();
    }
  }

  reloadStreets() {
    this.streets.set([]);
    this.current_offset = 0;
    this.hasMore.set(true);
    this.getStreets();
  }

  handleActions(action: string, street: Street) {
    if (action === 'edit') {
      this.editStreet(street);
    } else if (action === 'delete') {
      this.openDeleteModal(street);
    }
  }

  openModal() {
    this.isModalOpen.set(true);
    this.isEditMode.set(false);
    this.selectedStreetId.set(null);
    this.name_street.set('');
  }

  editStreet(street: Street) {
    this.isEditMode.set(true);
    this.selectedStreetId.set(street.id);
    this.name_street.set(street.name);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.name_street.set('');
    this.isEditMode.set(false);
    this.selectedStreetId.set(null);
  }
}
