import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '@components/member-card/member.types';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/members/`;

  getMembers(limit = 10, offset = 0): Observable<Member[]> {
    return this.http
      .get<{ data?: Member[]; items?: Member[] } | Member[]>(this.apiUrl, {
        params: { limit: limit.toString(), offset: offset.toString() },
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
}
