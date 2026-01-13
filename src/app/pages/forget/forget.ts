import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@components/input';
import { PanelComponent } from '@components/panel';
import { AuthService } from '@services/auth';
import { HeaderService } from '@services/header';
import { ToastService } from '@services/toast';

@Component({
  selector: 'app-forget',
  imports: [FormsModule],
  templateUrl: './forget.html',
  styleUrl: './forget.css',
})
export class Forget implements OnInit {
  private headerService = inject(HeaderService)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)

  email = signal('');

  ngOnInit(){
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.header_text.set('Recuperar Cuenta');
    this.headerService.buttons_on.set(false);
    this.headerService.is_normal.set(false);
    this.headerService.has_wave.set(true)
  }
}
