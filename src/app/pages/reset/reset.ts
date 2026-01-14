import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { HeaderService } from '@services/header';
import { ToastService } from '@services/toast';
import { InputComponent } from '@components/input';
import { PanelComponent } from '@components/panel';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@components/button';

@Component({
  selector: 'app-reset',
  imports: [InputComponent, PanelComponent, FormsModule, ButtonComponent],
  templateUrl: './reset.html',
  styleUrl: './reset.css',
})
export class Reset implements OnInit {
  private headerService = inject(HeaderService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  firstPassword = signal('');
  secondPassword = signal('');

  ngOnInit() {
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.header_text.set('Reestablecer Contraseña');
    this.headerService.buttons_on.set(false);
    this.headerService.is_normal.set(false);
    this.headerService.has_wave.set(true);
  }

  onSendPayload() {
    if (!this.firstPassword().trim() || !this.secondPassword().trim) {
      this.toastService.info('Porfavor ingrese las nuevas contraseñas');
      return;
    }
    if (this.firstPassword() != this.secondPassword()) {
      this.toastService.error('Las contraseñas deben ser iguales');
      return;
    }
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.toastService.error('Ocurrio un error inesperado', 'Error');
      return;
    }
    this.authService
      .resetPassword(
        {
          first: this.firstPassword(),
          second: this.secondPassword(),
        },
        token
      )
      .subscribe({
        next: () => {
          this.toastService.success('Contraseña cambiada', undefined, 5000);
          this.router.navigate(['/login']);
        },
        error: error => {
          if (error.status === 0) {
            this.toastService.error(
              'No se pudo conectar con el servidor, Verifica tu conexion a internet',
              'Sin conexión'
            );
          } else if (error.status === 401 || error.status === 403 || error.status === 422) {
            this.toastService.error('Contraseña invalida, intente con otra porfavor', 'Error');
          } else if (error.status === 400) {
            this.toastService.error('Contraseña no cambiada', 'Error');
          } else {
            this.toastService.error('Ha ocurrido un error inesperado. Intenta nuevamente', 'Error');
          }
        },
      });
  }
}
