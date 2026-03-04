import { Component, Input, output, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@components/modal';

export interface DropdownItem {
  label: string;
  isDisabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class DropdownComponent {
  @Input() isActive = false;
  @Input() dropTitle = 'Titulo';
  @Input() items: DropdownItem[] = [];
  selectedIndex: number | null = null;

  readonly isMobile = signal(window.innerWidth < 1024);

  itemSelected = output<string>();

  toggle() {
    this.isActive = !this.isActive;
  }

  selectItem(index: number, item: DropdownItem) {
    if (!item.isDisabled) {
      this.selectedIndex = index;
      this.dropTitle = item.label;
      this.isActive = false;
      this.itemSelected.emit(item.label);
    }
  }

  isItemSelected(index: number) {
    return index === this.selectedIndex;
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < 1024);
  }
}
