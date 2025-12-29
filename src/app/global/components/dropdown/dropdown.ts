import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chevron } from '../chevron/chevron';

@Component({
  selector: 'app-dropdown',
  standalone : true,
  imports: [CommonModule, Chevron],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  @Input() is_active: boolean = false;
  @Input() drop_title: string = "Titulo";

  toggle(){
    this.is_active = !this.is_active;
  }
}
