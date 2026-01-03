import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { DropdownComponent } from './dropdown/dropdown';
import { HeaderComponent } from './header/header';
<<<<<<< HEAD
import { DirectAccessComponent } from './direct-access/direct-access';
=======
import { InputComponent } from './input/input';
>>>>>>> origin/dev

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    HeaderComponent,
<<<<<<< HEAD
    DirectAccessComponent,
  ],
  exports: [
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    HeaderComponent,
    DirectAccessComponent,
  ],
=======
    InputComponent,
  ],
  exports: [ButtonComponent, ModalComponent, DropdownComponent, HeaderComponent, InputComponent],
>>>>>>> origin/dev
})
export class ComponentsModule {}
