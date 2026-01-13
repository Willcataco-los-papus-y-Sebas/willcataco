import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { User } from '@models/user';
import { LoginRequest, RecoveryRequest, ResetRequest } from '@models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/auth`;

  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal<boolean>(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  constructor() {
    this._checkSession();
  }

  login(credentials: LoginRequest): Observable<User> {
    this._loading.set(true);
    return this._http
      .post<User>(`${this._apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(user => this._user.set(user)),
        catchError(err => {
          this._user.set(null);
          return throwError(() => err);
        }),
        finalize(() => this._loading.set(false))
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

  refresh(): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}/refresh`, {}, { withCredentials: true }).pipe(
      catchError(err => {
        this._user.set(null);
        return throwError(() => err);
      })
    );
  }

  clearAuth(): void {
    this._user.set(null);
  }

  recoveryAccount(payload: RecoveryRequest): Observable<void> {
    this._loading.set(true);
    payload.url = this._apiUrl;
    return this._http
      .post<void>(`${this._apiUrl}/forgot`, payload, { withCredentials: true })
      .pipe(
        catchError(() => of(void 0)),
        finalize(() => {
          this._loading.set(false)
        })
      );
  }

  resetPassword(payload: ResetRequest): Observable<void> {
    this._loading.set(true);
    return this._http
      .post<void>(`${this._apiUrl}/reset`, payload, {withCredentials: true})
      .pipe(
        catchError(() => of(void 0)),
        finalize(() => {
          this._loading.set(false)
        })
      );
  }

  private _checkSession(): void {
    this._http
      .get<User>(`${this._apiUrl}/me`, {
        withCredentials: true,
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
      })
      .pipe(
        tap(user => this._user.set(user)),
        catchError(() => {
          this._user.set(null);
          return of(null);
        }),
        finalize(() => this._loading.set(false))
      )
      .subscribe();
  }
}
