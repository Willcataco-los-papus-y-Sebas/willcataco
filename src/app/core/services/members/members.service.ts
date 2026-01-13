import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '@models/members/member.types';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/members/`;

  getMembers(limit = 10, offset = 0, search?: string): Observable<Member[]> {
    const params: Record<string, string> = { limit: limit.toString(), offset: offset.toString() };

    if (search) {
      if (/^\d+$/.test(search)) {
        params['ci'] = search;
      } else {
        params['full_name'] = search;
      }
    }

    return this.http
      .get<{ data?: Member[]; items?: Member[] } | Member[]>(this.apiUrl, {
        params,
      })
      .pipe(
        map(response => {
          if ('data' in response && Array.isArray(response.data)) {
            return response.data;
          }
          if ('items' in response && Array.isArray(response.items)) {
            return response.items;
          }
          if (Array.isArray(response)) {
            return response;
          }
          return [];
        })
      );
  }

  getMemberById(id: number): Observable<Member> {
    return this.http
      .get<{ data: Member }>(`${this.apiUrl}${id}`)
      .pipe(map(response => response.data));
  }
}
