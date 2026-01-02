import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonHeader } from '../button-header/button-header';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonHeader],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  @Input() is_logo = true;
  @Input() header_text = '';
  @Input() buttons_on = true;
  @Input() size: 'normal' | 'big' = 'normal';
  @Input() logo = 'droplet-fill';
  @Input() has_design = true;
  @Input() design = 'header';
  @Input() dark_design = 'header-dark';
}
