import { Injectable, signal } from '@angular/core';
import { ICarruselItem } from '@components/carrusel/carrusel';
@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  is_logo = signal(true);
  header_text = signal('');
  buttons_on = signal(true);
  size = signal<'normal' | 'big'>('normal');
  logo = signal('droplet-fill');
  is_carrusel = signal(true);

  carrusel_items = signal<ICarruselItem[]>([]);
  carrusel_color = signal('bg-background');

  reset() {
    this.is_logo.set(true);
    this.header_text.set('');
    this.buttons_on.set(true);
    this.size.set('normal');
    this.logo.set('droplet-fill');
    this.is_carrusel.set(true);
    this.carrusel_items.set([]);
    this.carrusel_color.set('bg-background');
  }
}
