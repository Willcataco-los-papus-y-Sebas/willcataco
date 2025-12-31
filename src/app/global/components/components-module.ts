import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { ModalComponent } from './modal/modal';
import { DropdownComponent } from './dropdown/dropdown';
import { HeaderComponent } from './header/header';
import { DirectAccessComponent } from './direct-access/direct-access';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent, ModalComponent, DropdownComponent, HeaderComponent, DirectAccessComponent],
  exports: [ButtonComponent, ModalComponent, DropdownComponent, HeaderComponent, DirectAccessComponent],
})
export class ComponentsModule {}
