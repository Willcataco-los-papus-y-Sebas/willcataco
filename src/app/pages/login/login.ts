import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from '@services/header';
import { AuthService } from '@services/auth';
import { ToastService } from '@services/toast';
import { ButtonComponent } from '@components/button';
import { InputComponent } from '@components/input';
import { PanelComponent } from '@components/panel';
import { InfoSectionComponent } from './components/info-section';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent, InputComponent, InfoSectionComponent, PanelComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private headerService = inject(HeaderService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  username = signal('');
  password = signal('');

  missionText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie diam eget turpis sagittis, ut blandit risus pharetra. Suspendisse lobortis non risus sit amet mollis. Ut facilisis odio et justo tristique efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a ipsum rhoncus, laoreet ex eu, tempus mauris. Pellentesque nisl ligula, rutrum in blandit at, mattis eu tortor. Mauris dapibus id nisl interdum iaculis. Vestibulum nec odio cursus justo facilisis egestas. Nam varius porta ipsum, quis faucibus enim dapibus eget. Etiam imperdiet iaculis eros nec tempor. Nullam sodales metus quis sagittis pharetra. Cras quis sapien risus. Suspendisse ac turpis risus. In aliquam, lectus quis pharetra luctus, nibh massa tempus lorem, non venenatis sem mauris facilisis leo. Mauris tempor vitae sapien vitae mattis. Aliquam euismod rhoncus lobortis. Pellentesque feugiat vitae risus sit amet luctus. Cras vel posuere risus.';
  visionText =
    'Pellentesque nisl ligula, rutrum in blandit at, mattis eu tortor. Mauris dapibus id nisl interdum iaculis. Vestibulum nec odio cursus justo facilisis egestas. Nam varius porta ipsum, quis faucibus enim dapibus eget. Etiam imperdiet iaculis eros nec tempor. Nullam sodales metus quis sagittis pharetra. Cras quis sapien risus. Suspendisse ac turpis risus. In aliquam, lectus quis pharetra luctus, nibh massa tempus lorem, non venenatis sem mauris facilisis leo. Mauris tempor vitae sapien vitae mattis. Aliquam euismod rhoncus lobortis. Pellentesque feugiat vitae risus sit amet luctus. Cras vel posuere risus.';

  ngOnInit() {
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.buttons_on.set(false);
    this.headerService.header_text.set('Willcataco');
    this.headerService.is_normal.set(false);
  }

  onLogin() {
    if (!this.username().trim() || !this.password().trim()) {
      this.toastService.info('Por favor ingresa tu usuario y contraseña', 'Campos requeridos');
      return;
    }

    this.authService
      .login({
        username: this.username(),
        password: this.password(),
      })
      .subscribe({
        next: () => {
          this.toastService.success('Has iniciado sesión correctamente', 'Login exitoso');
          this.router.navigateByUrl('/', { replaceUrl: true });
        },
        error: error => {
          if (error.status === 0) {
            this.toastService.error(
              'No se pudo conectar con el servidor. Verifica tu conexión a internet',
              'Sin conexión'
            );
          } else if (error.status === 401 || error.status === 403) {
            this.toastService.error('Las credenciales no son válidas', 'Error de login');
          } else {
            this.toastService.error('Ha ocurrido un error inesperado. Intenta nuevamente', 'Error');
          }
        },
      });
  }
}
