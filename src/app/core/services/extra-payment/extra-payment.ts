import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { ExtraPayment, ExtraPaymentCreate, ExtraPaymentUpdate } from '@models/extra-payment';

export interface ApiResponse<T> {
  detail: string;
  status_code: number;
  data: T;
  page?: number;
  offset?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExtraPaymentService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/api/extra-payments`; 

  getAll(limit: number = 50, offset: number = 0): Observable<ApiResponse<ExtraPayment[]>> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this._http.get<ApiResponse<ExtraPayment[]>>(this._apiUrl, { params });
  }

  getById(id: number): Observable<ApiResponse<ExtraPayment>> {
    return this._http.get<ApiResponse<ExtraPayment>>(`${this._apiUrl}/${id}`);
  }

  create(payment: ExtraPaymentCreate): Observable<ApiResponse<ExtraPayment>> {
    return this._http.post<ApiResponse<ExtraPayment>>(this._apiUrl, payment);
  }

  update(id: number, payment: ExtraPaymentUpdate): Observable<ApiResponse<ExtraPayment>> {
    return this._http.patch<ApiResponse<ExtraPayment>>(`${this._apiUrl}/${id}`, payment);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._apiUrl}/${id}`);
  }
}