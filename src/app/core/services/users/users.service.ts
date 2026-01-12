import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/user';
import { environment } from 'src/environments/environment';
// 1. Dejamos solo el import
import { IResponse } from '@models/api-response'; 

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/users/`;

  getUsers(): Observable<IResponse<User[]>> {
    return this.http.get<IResponse<User[]>>(this.apiUrl);
  }

  createUser(user: Partial<User>): Observable<IResponse<User>> {
    return this.http.post<IResponse<User>>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<IResponse<User>> {
    return this.http.patch<IResponse<User>>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<IResponse<void>> {
    return this.http.delete<IResponse<void>>(`${this.apiUrl}/${id}`);
  }
}