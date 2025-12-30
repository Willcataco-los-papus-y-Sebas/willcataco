import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-header',
  imports: [],
  templateUrl: './button-header.html',
  styleUrl: './button-header.css',
})
export class ButtonHeader {
  @Input() icon: 'menu' | 'log_out' = 'menu';
}
