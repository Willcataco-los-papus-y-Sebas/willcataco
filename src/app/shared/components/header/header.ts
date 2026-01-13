import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonHeader } from '../button-header/button-header';
import { AuthService } from '@services/auth/auth';
import { Router } from '@angular/router';

import { HeaderService } from '@services/header';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonHeader],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  headerService = inject(HeaderService);

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
