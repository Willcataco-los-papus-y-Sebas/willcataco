import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderService } from '@services/header/header';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private headerService = inject(HeaderService);
  ngOnInit() {
    this.headerService.reset();
    this.headerService.buttons_on.set(false);
    this.headerService.header_text.set('Willcataco');
    this.headerService.size.set('big');
  }
}
