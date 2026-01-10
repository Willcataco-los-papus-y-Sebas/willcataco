import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { ExtraPayment, ExtraPaymentCreate, ExtraPaymentUpdate } from '@models/extra-payment';

export interface ApiResponse<T> {
  detail: string;
  status_code: number;
  data: T;
  limit?: number;
  offset?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExtraPaymentService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/extra-payments`;

  getAll(limit: number, offset: number): Observable<ApiResponse<ExtraPayment[]>> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this._http.get<ApiResponse<ExtraPayment[]>>(`${this._apiUrl}/`, { params });
  }

  getById(id: number): Observable<ApiResponse<ExtraPayment>> {
    return this._http.get<ApiResponse<ExtraPayment>>(`${this._apiUrl}/${id}`);
  }

  create(data: ExtraPaymentCreate): Observable<ApiResponse<ExtraPayment>> {
    return this._http.post<ApiResponse<ExtraPayment>>(this._apiUrl, data);
  }

  update(id: number, data: ExtraPaymentUpdate): Observable<ApiResponse<ExtraPayment>> {
    return this._http.patch<ApiResponse<ExtraPayment>>(`${this._apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._apiUrl}/${id}`);
  }
}
