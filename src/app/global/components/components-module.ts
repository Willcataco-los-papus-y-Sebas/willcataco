import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { DropdownComponent } from './dropdown/dropdown';
import { HeaderComponent } from './header/header';
import { DirectAccessComponent } from './direct-access/direct-access';
import { InputComponent } from './input/input';
import { KebabComponent } from './kebab/kebab';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    HeaderComponent,
    InputComponent,
    DirectAccessComponent,
    KebabComponent,
  ],
  exports: [
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    HeaderComponent,
    InputComponent,
    DirectAccessComponent,
    KebabComponent,
  ],
})
export class ComponentsModule {}
