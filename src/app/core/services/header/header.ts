import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  is_logo = signal(false);
  header_text = signal('');
  buttons_on = signal(true);
  is_normal = signal(true);
  logo = signal('willcataco');

  reset() {
    this.is_logo.set(false);
    this.header_text.set('');
    this.buttons_on.set(true);
    this.is_normal.set(true);
    this.logo.set('willcataco');
  }
}
