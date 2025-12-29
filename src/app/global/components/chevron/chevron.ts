import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chevron',
  imports: [CommonModule],
  templateUrl: './chevron.html',
  styleUrl: './chevron.css',
})
export class Chevron {
  @Input() isUp = true;
}
