import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { HeaderComponent } from './header/header';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent, ModalComponent, HeaderComponent],
  exports: [ButtonComponent, ModalComponent, HeaderComponent],
})
export class ComponentsModule {}
