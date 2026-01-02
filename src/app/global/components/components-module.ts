import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { DropdownComponent } from './dropdown/dropdown';
import { HeaderComponent } from './header/header';
import { ToastComponent } from './toast/toast';
import { InputComponent } from './input/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    HeaderComponent,
    ToastComponent,
    InputComponent,
  ],
  exports: [
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    HeaderComponent,
    ToastComponent,
    InputComponent,
  ],
})
export class ComponentsModule {}
