import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  is_logo = signal(true);
  header_text = signal('');
  buttons_on = signal(true);
  size = signal<'normal' | 'big'>('normal');
  logo = signal('droplet-fill');
  is_carrusel = signal(true)

  reset() {
    this.is_logo.set(true);
    this.header_text.set('');
    this.buttons_on.set(true);
    this.size.set('normal');
    this.logo.set('droplet-fill');
    this.is_carrusel.set(true)
  }
}
