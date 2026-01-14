import { Component, inject, signal, DestroyRef, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth';
import { ToastService } from '@services/toast';
import { HeaderService } from '@services/header';
import { ButtonComponent } from '@components/button';
import { InputComponent } from '@components/input';
import { PanelComponent } from '@components/panel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, RouterLink, ButtonComponent, InputComponent, PanelComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class AdminLogin implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private headerService = inject(HeaderService);
  private destroyRef = inject(DestroyRef);

  username = signal('');
  isLoading = signal(false);
  isProcessingToken = signal(false);
  hasToken = signal(false);

  constructor() {
    this.subscribeToQueryParams();
  }

  ngOnInit() {
    this.initializeHeader();
  }

  private initializeHeader(): void {
    this.headerService.reset();
    this.headerService.is_logo.set(true);
    this.headerService.buttons_on.set(false);
    this.headerService.header_text.set('Willcataco');
    this.headerService.is_normal.set(false);
    this.headerService.is_carrusel.set(false);
    this.headerService.has_wave.set(true);
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const token = params['token'];
      if (token) {
        this.hasToken.set(true);
        this.processToken(token);
      }
    });
  }

  onRequestLogin(): void {
    if (!this.username().trim()) {
      this.toastService.info('Por favor ingresa tu usuario', 'Campo requerido');
      return;
    }

    this.isLoading.set(true);

    this.authService
      .requestInternalLogin(this.username())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.success(
            'Se ha enviado un email con instrucciones para completar tu login',
            'Email enviado'
          );
          this.username.set('');
          this.isLoading.set(false);
        },
        error: error => {
          this.isLoading.set(false);
          this.handleLoginError(error);
        },
      });
  }

  private processToken(token: string): void {
    this.isProcessingToken.set(true);
    this.toastService.info('Procesando tu login...', 'Un momento');

    this.authService
      .internalLogin(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.success('Has iniciado sesión correctamente', 'Login exitoso');
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        },
        error: error => {
          this.isProcessingToken.set(false);
          this.hasToken.set(false);
          this.handleTokenError(error);
        },
      });
  }

  private handleLoginError(error: HttpErrorResponse | unknown): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.toastService.error(
          'No se pudo conectar con el servidor. Verifica tu conexión a internet',
          'Sin conexión'
        );
      } else if (error.status === 404) {
        this.toastService.error('Usuario no encontrado o sin permisos de admin', 'Error');
      } else if (error.status === 400) {
        this.toastService.error('El usuario no tiene permisos para login interno', 'Error');
      } else {
        this.toastService.error('Ha ocurrido un error inesperado. Intenta nuevamente', 'Error');
      }
    } else {
      this.toastService.error('Ha ocurrido un error inesperado. Intenta nuevamente', 'Error');
    }
  }

  private handleTokenError(error: HttpErrorResponse | unknown): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.toastService.error(
          'No se pudo conectar con el servidor. Verifica tu conexión a internet',
          'Sin conexión'
        );
      } else if (error.status === 400) {
        this.toastService.error('Token inválido o expirado', 'Error de token');
      } else if (error.status === 401) {
        this.toastService.error('No autorizado para login interno', 'Error');
      } else {
        this.toastService.error('Ha ocurrido un error inesperado. Intenta nuevamente', 'Error');
      }
    } else {
      this.toastService.error('Ha ocurrido un error inesperado. Intenta nuevamente', 'Error');
    }
  }
}
