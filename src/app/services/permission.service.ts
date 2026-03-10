import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RuleDetail {
    id: string;
    name: string;
    description: string;
    generatedLogic: string;
    priority: number;
}

import { ApiConfig } from '../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    private apiUrl = `${ApiConfig.baseUrl}/permissions`;

    constructor(private http: HttpClient) { }

    getAllPermissions(): Observable<string[]> {
        return this.http.get<string[]>(this.apiUrl);
    }

    getConditions(permission: string): Observable<{ permission: string, conditions: RuleDetail[] }> {
        return this.http.get<{ permission: string, conditions: RuleDetail[] }>(`${this.apiUrl}/${permission}/conditions`);
    }
}
