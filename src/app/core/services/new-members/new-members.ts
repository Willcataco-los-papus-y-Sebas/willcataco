import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models/api-response';
import { Member, MemberCreate } from '@models/new-members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/api/members`;

  create(member: MemberCreate): Observable<ApiResponse<Member>> {
    return this._http.post<ApiResponse<Member>>(`${this._apiUrl}/`, member);
  }

  getAll(limit: number, offset: number): Observable<ApiResponse<Member[]>> {
     return this._http.get<ApiResponse<Member[]>>(`${this._apiUrl}/?limit=${limit}&offset=${offset}`);
  }
}