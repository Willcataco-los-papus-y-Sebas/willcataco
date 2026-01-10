import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models/api-response';
import { Action, ActionCreate, ActionPatch } from '@models/actions';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/actions`; 

  getAll(limit: number, offset: number): Observable<ApiResponse<Action[]>> {
    const params = new HttpParams().set('limit', limit).set('skip', offset);
    return this._http.get<ApiResponse<Action[]>>(`${this._apiUrl}/`, { params });
  }

  getById(id: number): Observable<ApiResponse<Action>> {
    return this._http.get<ApiResponse<Action>>(`${this._apiUrl}/${id}`);
  }

  create(data: ActionCreate): Observable<ApiResponse<Action>> {
    return this._http.post<ApiResponse<Action>>(`${this._apiUrl}/`, data);
  }

  update(id: number, data: ActionPatch): Observable<ApiResponse<Action>> {
    return this._http.patch<ApiResponse<Action>>(`${this._apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._apiUrl}/${id}`);
  }
}