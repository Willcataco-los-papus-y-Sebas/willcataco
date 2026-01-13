import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-card.html',
  styleUrl: './data-card.css',
})
export class DataCardComponent {
  @Input() firstLine = '';
  @Input() secondLine = '';
  @Input() thirdLine = '';
}
