import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../../shared/components/member-card/member.types';

@Injectable({
    providedIn: 'root'
})
export class MembersService {
    private http = inject(HttpClient);
    // Endpoint: /api/v1/members
    private apiUrl = '/api/v1/members';

    getMembers(limit: number = 10, offset: number = 0): Observable<Member[]> {
        return this.http.get<any>(this.apiUrl, {
            params: { limit: limit.toString(), offset: offset.toString() }
        }).pipe(
            map(response => {
                if (response.data && Array.isArray(response.data)) {
                    return response.data;
                }
                if (response.items && Array.isArray(response.items)) {
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
