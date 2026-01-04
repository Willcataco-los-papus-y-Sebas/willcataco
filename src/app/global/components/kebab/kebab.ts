import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KebabOption } from './kebab.types';

@Component({
  selector: 'app-kebab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kebab.html',
  styleUrl: './kebab.css',
})
export class KebabComponent {
  @Input() options: KebabOption[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  isOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  selectOption(action: string, event: Event) {
    event.stopPropagation();
    this.optionSelected.emit(action);
    this.isOpen = false;
  }

  closeMenu(event?: Event) {
    if (event) event.stopPropagation();
    this.isOpen = false;
  }
}
