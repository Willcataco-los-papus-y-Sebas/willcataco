import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { DropdownComponent } from './dropdown/dropdown';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent, ModalComponent, DropdownComponent],
  exports: [ButtonComponent, ModalComponent, DropdownComponent],
})
export class ComponentsModule {}
