import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonHeader } from '../button-header/button-header';
import { AuthService } from '@services/auth/auth';
import { Router } from '@angular/router';
import { Carrusel } from '@components/carrusel/carrusel';
import { ICarruselItem } from '@models/carrusel/carrusel.item.types';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonHeader, Carrusel],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Input() is_logo = true;
  @Input() header_text = '';
  @Input() buttons_on = true;
  @Input() size: 'normal' | 'big' = 'normal';
  @Input() logo = 'droplet-fill';
  @Input() is_carrusel = true;

  @Input() carrusel_items: ICarruselItem[] = [];
  @Input() carrusel_color = 'bg-background';

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
