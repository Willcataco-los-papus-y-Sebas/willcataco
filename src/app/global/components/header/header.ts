import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonMenu } from '../button-menu/button-menu';
import { ButtonLogout } from '../button-logout/button-logout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonMenu, ButtonLogout],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  @Input() for_log: boolean= false;
  @Input() header_text: string = '';
}
