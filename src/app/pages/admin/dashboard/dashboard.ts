import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '@services/header';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private headerService = inject(HeaderService);

  ngOnInit() {
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.buttons_on.set(true);
    this.headerService.header_text.set('Willcataco');
    this.headerService.is_normal.set(false);
    this.headerService.is_carrusel.set(false);
    this.headerService.has_wave.set(true);
  }
}
