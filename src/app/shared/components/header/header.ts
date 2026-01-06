import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonHeader } from '../button-header/button-header';
import { AuthService } from '@services/auth/auth';
import { Router } from '@angular/router';

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

  @Input() is_logo = true;
  @Input() header_text = '';
  @Input() buttons_on = true;
  @Input() is_normal = true;
  @Input() logo = 'droplet-fill';

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
