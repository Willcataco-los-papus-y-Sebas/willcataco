import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@envs/environment';
import { ApiResponse } from '@models/api-response';
import { Member } from '@models/members/member.types';

@Injectable({ providedIn: 'root' })
export class MembersService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/members`;

  getAll(limit = 10, offset = 0, search?: string): Observable<Member[]> {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    if (search) {
      const key = /^\d+$/.test(search) ? 'ci' : 'full_name';
      params = params.set(key, search);
    }

    return this._http
      .get<ApiResponse<Member[]>>(`${this._apiUrl}/`, { params })
      .pipe(map(response => response.data ?? []));
  }

  getById(id: number): Observable<Member> {
    return this._http
      .get<ApiResponse<Member>>(`${this._apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  getByDate(year?: string, month?: string, limit = 10, offset = 0): Observable<Member[]> {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    if (year) params = params.set('year', year);
    if (month) params = params.set('month', month);

    return this._http
      .get<ApiResponse<Member[]>>(`${this._apiUrl}/by_date`, { params })
      .pipe(map(response => response.data ?? []));
  }
}
