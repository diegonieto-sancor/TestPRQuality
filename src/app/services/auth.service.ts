import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MenuPermisosResponse, RuleContext } from '../models/permissions.model';

import { ApiConfig } from '../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${ApiConfig.baseUrl}/permissions`;
    private permissionsSubject = new BehaviorSubject<Set<string>>(new Set());
    public permissions$ = this.permissionsSubject.asObservable();

    constructor(private http: HttpClient) { }

    /**
     * Carga permisos desde el backend basado en parámetros del usuario
     */
    loadPermissions(
        plan: string = 'SANCOR 3000',
        esTitular: boolean = true,
        sexo: string = 'F',
        edad: number = 30,
        discapacidad: string = 'N',
        campaniaVacunacion: boolean = false,
        campaniaCompartiSalud: boolean = false,
        parentesco: number = 0,
        linea: string = 'N'
    ): Observable<MenuPermisosResponse> {
        let params = new HttpParams()
            .set('plan', plan)
            .set('esTitular', esTitular.toString())
            .set('sexo', sexo)
            .set('edad', edad.toString())
            .set('discapacidad', discapacidad)
            .set('campaniaVacunacion', campaniaVacunacion.toString())
            .set('campaniaCompartiSalud', campaniaCompartiSalud.toString())
            .set('parentesco', parentesco.toString())
            .set('linea', linea);

        return this.http.get<MenuPermisosResponse>(`${this.apiUrl}/menu`, { params })
            .pipe(
                tap(response => {
                    const permsSet = new Set(response.permissions);
                    this.permissionsSubject.next(permsSet);
                })
            );
    }

    /**
     * Evalúa permisos con contexto completo
     */
    evaluatePermissions(context: RuleContext): Observable<MenuPermisosResponse> {
        return this.http.post<MenuPermisosResponse>(`${this.apiUrl}/evaluate`, context)
            .pipe(
                tap(response => {
                    const permsSet = new Set(response.permissions);
                    this.permissionsSubject.next(permsSet);
                })
            );
    }

    /**
     * Verifica si el usuario tiene un permiso específico
     */
    hasPermission(permission: string): boolean {
        return this.permissionsSubject.value.has(permission);
    }

    /**
     * Verifica si el usuario tiene al menos uno de los permisos especificados
     */
    hasAnyPermission(permissions: string[]): boolean {
        return permissions.some(p => this.hasPermission(p));
    }

    /**
     * Verifica si el usuario tiene todos los permisos especificados
     */
    hasAllPermissions(permissions: string[]): boolean {
        return permissions.every(p => this.hasPermission(p));
    }

    /**
     * Obtiene todos los permisos actuales
     */
    getPermissions(): Set<string> {
        return this.permissionsSubject.value;
    }
}
