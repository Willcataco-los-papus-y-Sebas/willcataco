import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@services/sidebar';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  readonly sidebarService = inject(SidebarService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.authService.user;

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.sidebarService.close();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.sidebarService.close();
      this.router.navigate(['/login']);
    });
  }
}
