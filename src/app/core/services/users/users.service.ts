import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@envs/environment';
import { User } from '@models/user';
import { ApiResponse } from '@models/api-response';
import { CreateUserDTO, UpdateUserDTO } from '@models/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/users`;

  getAll(): Observable<ApiResponse<User[]>> {
    return this._http.get<ApiResponse<User[]>>(`${this._apiUrl}/`);
  }

  create(payload: CreateUserDTO): Observable<ApiResponse<User>> {
    return this._http.post<ApiResponse<User>>(`${this._apiUrl}/`, payload);
  }

  update(id: number, payload: UpdateUserDTO): Observable<ApiResponse<User>> {
    return this._http.patch<ApiResponse<User>>(`${this._apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._apiUrl}/${id}`);
  }
}
