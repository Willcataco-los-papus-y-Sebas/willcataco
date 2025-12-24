import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { HeaderComponent } from './header/header';

@NgModule({
  declarations: [], 
  imports: [
    CommonModule,
    ButtonComponent,
    HeaderComponent 
  ],
  exports: [
    ButtonComponent,
    HeaderComponent 
  ]
})
export class ComponentsModule { }