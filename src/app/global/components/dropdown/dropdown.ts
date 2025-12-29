import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chevron } from '../chevron/chevron';
import { DropdownItem } from './dropdown-item/dropdown-item';

@Component({
  selector: 'app-dropdown',
  standalone : true,
  imports: [CommonModule, Chevron, DropdownItem],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  @Input() isActive: boolean = false;
  @Input() dropTitle: string = "Titulo";
  @Input() items: DropdownItem[] = [];
  
  selectedIndex: number | null = null;

  toggle(){
    this.isActive = !this.isActive;
  }

  selectItem(index: number, item: DropdownItem) {
    if (!item.isDisabled) {
      this.selectedIndex = index;
      this.dropTitle = item.label;
      this.isActive = false;
    }
  }
}
