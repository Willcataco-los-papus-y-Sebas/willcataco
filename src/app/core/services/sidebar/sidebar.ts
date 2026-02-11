import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@services/auth';
import { SidebarItem } from '@models/sidebar';
import { UserRole } from '@enums/user-role';

const MEMBER_ITEMS: SidebarItem[] = [
  { label: 'Inicio', icon: 'home', route: '/', scope: 'member' },
];

const STAFF_ITEMS: SidebarItem[] = [
  { label: 'Dashboard', icon: 'chart-bar', route: '/dashboard', scope: 'internal', roles: ['staff', 'admin'] },
  { label: 'Socios', icon: 'users', route: '/members', scope: 'internal', roles: ['staff', 'admin'] },
  { label: 'Cobros extras', icon: 'currency-dollar', route: '/extra-payments', scope: 'internal', roles: ['staff', 'admin'] },
  { label: 'Acciones', icon: 'clipboard-list', route: '/actions', scope: 'internal', roles: ['staff', 'admin'] },
];

const ADMIN_ONLY_ITEMS: SidebarItem[] = [
  { label: 'Usuarios', icon: 'key', route: '/users', scope: 'internal', roles: ['admin'] },
];

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly authService = inject(AuthService);

  readonly isOpen = signal(false);

  readonly items = computed<SidebarItem[]>(() => {
    const user = this.authService.user();
    if (!user) return [];

    if (user.scope === 'member') {
      return MEMBER_ITEMS;
    }

    if (user.scope === 'internal') {
      const base = [...STAFF_ITEMS];
      if (user.role === UserRole.ADMIN) {
        return [...base, ...ADMIN_ONLY_ITEMS];
      }
      return base;
    }

    return [];
  });

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
