import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "@components/button/button";
import { ModalComponent } from "@components/modal/modal";
import { InputComponent } from "@components/input/input";
import { Street } from '@models/streets';
import { StreetService } from '@services/street/street';
import { HeaderService } from '@services/header';
import { ToastService } from '@services/toast/toast.service';
import { KebabComponent } from "@components/kebab/kebab";
import { KebabOption } from '@components/kebab/kebab.types';

@Component({
  selector: 'app-streets',
  imports: [FormsModule, ButtonComponent, ModalComponent, InputComponent, KebabComponent],
  templateUrl: './streets.html',
  styleUrl: './streets.css',
})
export class Streets implements OnInit{
  private headerService = inject(HeaderService)
  private toastService = inject(ToastService)
  private streetService = inject(StreetService)

  name_street = signal('');
  streets = signal<Street[]>([]);
  selectedStreetId = signal<number | null>(null);
  
  loading = signal(false);
  isModalOpen = signal<boolean>(false);
  isEditMode = signal(false);
  
  kebabOptions: KebabOption[] = [
    { label: 'Editar', action: 'edit' },
    { label: 'Eliminar', action: 'delete', variant: 'danger' },
  ];

  ngOnInit(): void {
    this.headerService.is_logo.set(false);
    this.headerService.header_text.set('Gestionamiento de nuestras calles');
    this.getStreets();
  }


  deleteStreet(street: Street) {
    this.streetService.delete(street.id).subscribe({
      next: () => {
        this.toastService.success("Calle eliminada");
        this.getStreets();
      },
      error: (err) => {
        console.error('Error al eliminar calle:', err);
        this.toastService.error('No se pudo eliminar la calle');
      }
    })
  }

  registerStreet() {

    const street_input = { name: this.name_street()};

    if(this.isEditMode() && this.selectedStreetId()){
      this.streetService.update(this.selectedStreetId()!, street_input).subscribe({
        next: () => {
          this.toastService.success("Calle actualizada");
          this.getStreets();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          this.toastService.error("No se pudo actualizar la calle")
        }
      })
    }else {
      this.streetService.create(
        street_input
      ).subscribe({
        next: () => {
          this.toastService.success("Calle registrada con exito");
          this.getStreets();
          this.name_street.set('');
        },
        error: err => {
          if(err.error?.detail === "Street already exist") {
            this.toastService.error("La calle ya existe");
          } else {
            this.toastService.error("La calle no se pudo crear");
          }
        }
      })
    }
  }

  getStreets() {
    this.loading.set(true);
    this.loadStreets([], 0);
  }
  
  private loadStreets (loadedStreets: Street[], offset: number) {
    const limit = 10;
    this.loading.set(true);
    this.streetService.getAll(limit, offset)
    .subscribe({
      next: (response) => {
        const allStreets = [...loadedStreets, ...response.data];
        this.loading.set(false);

        if(response.data.length < limit) {
          this.streets.set(allStreets);
        } else {
          this.loadStreets(allStreets, offset + limit)
        }
      },
      error: err => {
      console.error("Streets not load", err);
    }
    })
  }

  handleActions(action: string, street: Street) {
    if (action === 'edit') {
      this.editStreet(street);
    } else if (action === 'delete') {
      this.deleteStreet(street);
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
