import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { DropdownComponent } from './dropdown/dropdown';
import { HeaderComponent } from './header/header';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent, ModalComponent, DropdownComponent, HeaderComponent],
  exports: [ButtonComponent, ModalComponent, DropdownComponent, HeaderComponent],
})
export class ComponentsModule {}
