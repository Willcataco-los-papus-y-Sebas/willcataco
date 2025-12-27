import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonComponent,
    ModalComponent
  ],
  exports: [
    ButtonComponent,
    ModalComponent
  ]
})
export class ComponentsModule {}
