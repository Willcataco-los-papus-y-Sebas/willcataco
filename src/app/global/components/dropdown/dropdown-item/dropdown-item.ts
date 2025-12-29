import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './dropdown-item.css',
  templateUrl: './dropdown-item.html',
})
export class DropdownItem {
  @Input() label = 'Opcion';
  @Input() isSelected = false;
  @Input() isDisabled = false;
}
