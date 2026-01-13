import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@components/input';
import { PanelComponent } from '@components/panel';
import { AuthService } from '@services/auth';
import { HeaderService } from '@services/header';
import { ToastService } from '@services/toast';
import { ButtonComponent } from "@components/button";

@Component({
  selector: 'app-forget',
  imports: [FormsModule, PanelComponent, InputComponent, ButtonComponent],
  templateUrl: './forget.html',
  styleUrl: './forget.css',
})
export class Forget implements OnInit {
  private headerService = inject(HeaderService)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)

  email = signal('');

  ngOnInit() {
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.header_text.set('Recuperar Cuenta');
    this.headerService.buttons_on.set(false);
    this.headerService.is_normal.set(false);
    this.headerService.has_wave.set(true)
  }

  onSendPayload() {
    if (!this.email().trim()) {
      this.toastService.info('Porfavor ingrese su email registrado en wilcataco');
      return;
    }
    this.authService
      .recoveryAccount({
        email: this.email(),
        url: '',
      })
      .subscribe({
        next: () => {
          this.toastService.success('Le llegara un email con los siguientes pasos', 'Email enviado, puede cerrar esta pagina', 5000);
        },
        error: error => {
          if (error.status === 0) {
            this.toastService.error(
              'No se pudo conectar con el servidor, Verifica tu conexion a internet',
              'Sin conexión',
            )
          } else if (error.status === 401 || error.status === 403 || error.status === 422 || error.status === 404) {
            this.toastService.error('No se envio el email, revise el correo', 'Error')
          } else {
            this.toastService.error('Ha ocurrido un error inesperado. Intenta nuevamente', 'Error');
          }
        }
      })
  }
}
