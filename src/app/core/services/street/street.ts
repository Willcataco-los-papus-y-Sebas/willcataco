import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models/api-response';
import { Street, StreetCreate, StreetUpdate } from '@models/streets';

@Injectable({
  providedIn: 'root',
})
export class StreetService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/street`;

  getAll(limit: number, offset: number): Observable<ApiResponse<Street[]>> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this._http.get<ApiResponse<Street[]>>(`${this._apiUrl}/`, { params });
  }

  getById(id: number): Observable<ApiResponse<Street>> {
    return this._http.get<ApiResponse<Street>>(`${this._apiUrl}/${id}`);
  }

  create(street: StreetCreate): Observable<ApiResponse<Street>> {
    return this._http.post<ApiResponse<Street>>(this._apiUrl, street);
  }

  update(id: number, street: StreetUpdate): Observable<ApiResponse<Street>> {
    return this._http.patch<ApiResponse<Street>>(`${this._apiUrl}/${id}`, street);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._apiUrl}/${id}`);
  }
}
