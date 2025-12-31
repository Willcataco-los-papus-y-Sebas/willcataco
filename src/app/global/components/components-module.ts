import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { Dropdown } from './dropdown/dropdown';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent,Dropdown ],
  exports: [ButtonComponent, Dropdown],
})
export class ComponentsModule {}
