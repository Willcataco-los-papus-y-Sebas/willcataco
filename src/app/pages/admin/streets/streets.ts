import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '@services/header';
import { ButtonComponent } from "@components/button/button";
import { ModalComponent } from "@components/modal/modal";
import { InputComponent } from "@components/input/input";

@Component({
  selector: 'app-streets',
  imports: [ButtonComponent, ModalComponent, InputComponent],
  templateUrl: './streets.html',
  styleUrl: './streets.css',
})
export class Streets implements OnInit{
  private headerService = inject(HeaderService)

  ngOnInit(): void {
    this.headerService.is_logo.set(false);
    this.headerService.header_text.set('Gestionamiento de nuestras calles')
  }

  isModalOpen = false;

  OpenModal() {
    this.isModalOpen = true;
  }

  CloseModal() {
    this.isModalOpen = false;
  }

}
