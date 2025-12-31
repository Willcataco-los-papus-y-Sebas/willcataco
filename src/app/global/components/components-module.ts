import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { DropdownComponent } from './dropdown/dropdown';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent, DropdownComponent],
  exports: [ButtonComponent, DropdownComponent],
})
export class ComponentsModule {}
