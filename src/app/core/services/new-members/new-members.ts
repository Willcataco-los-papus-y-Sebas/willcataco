import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@envs/environment';
import { ApiResponse } from '@models/api-response';
import { Member, MemberCreate } from '@models/new-members';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/members`;

  create(member: MemberCreate): Observable<ApiResponse<Member>> {
    return this._http.post<ApiResponse<Member>>(`${this._apiUrl}/`, member);
  }

  getAll(limit: number, offset: number): Observable<ApiResponse<Member[]>> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this._http.get<ApiResponse<Member[]>>(`${this._apiUrl}/`, { params });
  }
}
