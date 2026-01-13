import { Injectable, signal } from '@angular/core';
import { ICarruselItem } from '../../../shared/models/carrusel/carrusel.item.types';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  is_logo = signal(false);
  header_text = signal('');
  buttons_on = signal(true);
  is_normal = signal(true);
  logo = signal('willcataco');
  is_carrusel = signal(false);
  carrusel_items = signal<ICarruselItem[]>([]);
  carrusel_color = signal('bg-background');
  has_wave = signal(false);

  reset() {
    this.is_logo.set(false);
    this.header_text.set('');
    this.buttons_on.set(true);
    this.is_normal.set(true);
    this.logo.set('willcataco');
    this.is_carrusel.set(false);
    this.carrusel_items.set([]);
    this.carrusel_color.set('bg-background');
    this.has_wave.set(false);
  }
}
