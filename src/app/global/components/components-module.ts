import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { DropdownComponent } from './dropdown/dropdown';
import { HeaderComponent } from './header/header';
import { ToastComponent } from './toast/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    HeaderComponent,
    ToastComponent,
  ],
  exports: [ButtonComponent, ModalComponent, DropdownComponent, HeaderComponent, ToastComponent],
})
export class ComponentsModule {}
