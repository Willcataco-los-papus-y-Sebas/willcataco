import { Component, Input , output} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownItem {
  label: string;
  isDisabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class DropdownComponent {
  @Input() isActive = false;
  @Input() dropTitle = 'Titulo';
  @Input() items: DropdownItem[] = [];
  selectedIndex: number | null = null;

  itemSelected = output<string>();

  toggle() {
    this.isActive = !this.isActive;
  }

  selectItem(index: number, item: DropdownItem) {
    if (!item.isDisabled) {
      this.selectedIndex = index;
      this.dropTitle = item.label;
      this.isActive = false;
      this.itemSelected.emit(item.label)
    }
  }

  isItemSelected(index: number) {
    return index === this.selectedIndex;
  }
}
