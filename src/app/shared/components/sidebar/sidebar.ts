import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@services/sidebar';
import { AuthService } from '@services/auth';
import { UserRole } from '@enums/user-role';

const ROLE_LABELS: Record<string, string> = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.STAFF]: 'Mesa Directiva',
};

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

  readonly displayRole = computed(() => {
    const u = this.user();
    if (!u) return '';
    if (u.scope === 'member') return 'Socio';
    return ROLE_LABELS[u.role] ?? u.role;
  });

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
