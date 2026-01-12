import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@models/user';
import { IResponse } from '@models/api-response';
import { environment } from 'src/environments/environment';

import { CreateUserDTO, UpdateUserDTO } from './user.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/users`;

  getUsers(): Observable<IResponse<User[]>> {
    return this.http.get<IResponse<User[]>>(`${this.apiUrl}/`);
  }

  createUser(payload: CreateUserDTO): Observable<IResponse<User>> {
    return this.http.post<IResponse<User>>(`${this.apiUrl}/`, payload);
  }

  updateUser(id: number, payload: UpdateUserDTO): Observable<IResponse<User>> {
    return this.http.patch<IResponse<User>>(`${this.apiUrl}/${id}`, payload);
  }

  deleteUser(id: number): Observable<IResponse<void>> {
    return this.http.delete<IResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
