import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonHeader } from '../button-header/button-header';
import { Carrusel } from '@components/carrusel';
import { AuthService } from '@services/auth/auth';
import { Router } from '@angular/router';
import { HeaderService } from '@services/header';
import { SidebarService } from '@services/sidebar';

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
  headerService = inject(HeaderService);
  sidebarService = inject(SidebarService);

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.sidebarService.close();
      this.router.navigate(['/login']);
    });
  }
}
