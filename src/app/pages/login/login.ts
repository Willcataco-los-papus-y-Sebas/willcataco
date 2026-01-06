import { Component, inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="login()" #form="ngForm">
      <input [(ngModel)]="username" name="username" placeholder="Username" required />
      <input
        [(ngModel)]="password"
        type="password"
        name="password"
        placeholder="Password"
        required />
      <button [disabled]="auth.loading() || form.invalid">
        {{ auth.loading() ? 'Logging in...' : 'Login' }}
      </button>
      @if (error) {
        <p class="error">{{ error }}</p>
      }
    </form>
  `,
})
export class Login {
  auth = inject(AuthService);
  private router = inject(Router);
  private injector = inject(Injector);

  username = 'admin';
  password = 'password123';
  error = '';

  login() {
    if (!this.username || !this.password) {
      this.error = 'Username and password are required';
      return;
    }

    this.error = '';
    this.auth
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          this.error = err.error?.detail?.[0]?.msg || 'Login failed';
        },
      });
  }
}
