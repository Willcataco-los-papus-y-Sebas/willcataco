import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() modalClose = new EventEmitter<void>();

  closeModal() {
    this.modalClose.emit();
  }
}
