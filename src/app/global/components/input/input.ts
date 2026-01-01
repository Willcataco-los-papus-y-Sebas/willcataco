import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrls: ['./input.css']
})
export class InputComponent {
  @Input() label: string = 'Etiqueta';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  
  @Input() id: string = 'input-' + Math.random().toString(36).substring(2);
}