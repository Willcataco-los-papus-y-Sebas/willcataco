import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@envs/environment';
import { ApiResponse } from '@models/api-response';
import { WaterPayment } from '@models/water-payments/water-payment.types';

@Injectable({ providedIn: 'root' })
export class WaterPaymentsService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/water_payment`;

  getAll(
    memberId?: number,
    status?: 'PAID' | 'UNPAID',
    limit = 100,
    offset = 0
  ): Observable<WaterPayment[]> {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    if (memberId) params = params.set('member_id', memberId);
    if (status) params = params.set('status', status);

    return this._http
      .get<ApiResponse<WaterPayment[]>>(`${this._apiUrl}/`, { params })
      .pipe(map(response => response.data ?? []));
  }
}
