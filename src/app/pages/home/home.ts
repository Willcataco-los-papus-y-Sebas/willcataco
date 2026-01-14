import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '@services/header';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private headerService = inject(HeaderService);

  ngOnInit() {
    this.headerService.reset();
    this.headerService.is_logo.set(false);
    this.headerService.header_text.set('Home');
  }
}
