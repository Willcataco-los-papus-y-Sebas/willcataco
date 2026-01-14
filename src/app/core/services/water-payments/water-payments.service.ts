import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { WaterPayment } from '@models/water-payments/water-payment.types';

@Injectable({
  providedIn: 'root',
})
export class WaterPaymentsService {
  private http = inject(HttpClient);
  // Assuming the backend route prefix is /api/water-meters/water-payments
  private apiUrl = `${environment.apiUrl}/api/water-meters/water-payments/`;

  getWaterPayments(
    memberId?: number,
    status?: 'PAID' | 'UNPAID',
    limit = 100,
    offset = 0
  ): Observable<WaterPayment[]> {
    let params: any = { limit: limit.toString(), offset: offset.toString() };

    if (memberId) {
      params.member_id = memberId.toString();
    }

    if (status) {
      params.status = status;
    }

    return this.http.get<{ data?: WaterPayment[] }>(this.apiUrl, { params }).pipe(
      map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      })
    );
  }
}
