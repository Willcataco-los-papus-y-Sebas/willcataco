import { computed, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@envs/environment';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { User } from '@models/user';
import {
  LoginRequest,
  AuthResponse,
  InternalLoginRequest,
  RecoveryRequest,
  ResetRequest,
} from '@models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _document = inject(DOCUMENT);
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/auth`;

  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal<boolean>(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  constructor() {
    this.checkAuth();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this._loading.set(true);
    return this._http
      .post<AuthResponse>(`${this._apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(() => {
          this._http.get<AuthResponse>(`${this._apiUrl}/me`, { withCredentials: true }).subscribe({
            next: response => {
              this._user.set(response.data as User);
              this._loading.set(false);
            },
            error: () => {
              this._user.set(null);
              this._loading.set(false);
            },
          });
        }),
        catchError(err => {
          this._user.set(null);
          this._loading.set(false);
          return throwError(() => err);
        })
      );
  }

  requestInternalLogin(username: string): Observable<void> {
    const request: InternalLoginRequest = { username };
    return this._http.post<void>(`${this._apiUrl}/internal/request`, request, {
      withCredentials: true,
    });
  }

  internalLogin(token: string): Observable<AuthResponse> {
    this._loading.set(true);
    return this._http
      .post<AuthResponse>(
        `${this._apiUrl}/internal/login?token=${token}`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          this._http.get<AuthResponse>(`${this._apiUrl}/me`, { withCredentials: true }).subscribe({
            next: response => {
              this._user.set(response.data as User);
              this._loading.set(false);
            },
            error: () => {
              this._user.set(null);
              this._loading.set(false);
            },
          });
        }),
        catchError(err => {
          this._user.set(null);
          this._loading.set(false);
          return throwError(() => err);
        })
      );
  }

  logout(): Observable<void> {
    this._loading.set(true);
    return this._http.post<void>(`${this._apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      catchError(() => of(void 0)),
      finalize(() => {
        this._user.set(null);
        this._loading.set(false);
      })
    );
  }

  refreshToken(): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}/refresh`, {}, { withCredentials: true }).pipe(
      catchError(err => {
        this._user.set(null);
        return throwError(() => err);
      })
    );
  }

  getCurrentUser(): Observable<AuthResponse> {
    return this._http
      .get<AuthResponse>(`${this._apiUrl}/me`, {
        withCredentials: true,
      })
      .pipe(
        tap(response => {
          this._user.set(response.data as User);
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  recoveryAccount(payload: RecoveryRequest): Observable<void> {
    this._loading.set(true);
    payload.url = this._document.location.origin;
    return this._http.post<void>(`${this._apiUrl}/forgot`, payload, { withCredentials: true }).pipe(
      catchError(err => {
        return throwError(() => err);
      }),
      finalize(() => {
        this._loading.set(false);
      })
    );
  }

  resetPassword(payload: ResetRequest, token: string): Observable<void> {
    this._loading.set(true);
    const params = new HttpParams().set('token', token);
    return this._http
      .post<void>(`${this._apiUrl}/reset`, payload, {
        params,
        withCredentials: true,
      })
      .pipe(
        catchError(err => {
          return throwError(() => err);
        }),
        finalize(() => {
          this._loading.set(false);
        })
      );
  }

  checkAuth(): void {
    this._loading.set(true);
    this._http
      .get<AuthResponse>(`${this._apiUrl}/me`, {
        withCredentials: true,
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
      })
      .pipe(
        tap(response => this._user.set(response.data as User)),
        catchError(() => {
          this._user.set(null);
          return of(null);
        }),
        finalize(() => this._loading.set(false))
      )
      .subscribe();
  }

  clearAuth(): void {
    this._user.set(null);
  }
}
