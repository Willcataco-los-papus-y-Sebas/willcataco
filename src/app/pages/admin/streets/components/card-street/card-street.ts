import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-street',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-street.html',
  styleUrl: './card-street.css',
})
export class CardStreet {
  @Input() firstLine = 'Titulo';
  @Input() secondLine = 'Subtitulo';
  @Input() thirdLine = 'Body';
}
