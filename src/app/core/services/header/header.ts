import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  is_logo = signal(true);
  header_text = signal('');
  buttons_on = signal(true);
  is_normal = signal(true);
  logo = signal('droplet-fill');

  reset() {
    this.is_logo.set(true);
    this.header_text.set('');
    this.buttons_on.set(true);
    this.is_normal.set(true);
    this.logo.set('droplet-fill');
  }
}
