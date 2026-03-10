import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { ApiConfig } from '../../config/api.config';

interface UserProfile {
    name: string;
    plan: string;
    esTitular: boolean;
    sexo: string;
    edad: number;
    discapacidad: string;
    campaniaVacunacion: boolean;
    campaniaCompartiSalud: boolean;
    parentesco: number;
    linea: string;
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    ApiConfig = ApiConfig; // Make available to template
    loading = false;
    error = '';

    predefinedUsers: UserProfile[] = [
        {
            name: 'Socio Premium - Mujer Titular',
            plan: 'SANCOR 3000',
            esTitular: true,
            sexo: 'F',
            edad: 30,
            discapacidad: 'N',
            campaniaVacunacion: true,
            campaniaCompartiSalud: true,
            parentesco: 0,
            linea: 'N'
        },
        {
            name: 'Socio Plan ON 1 - Hombre',
            plan: 'SANCOR ON 1',
            esTitular: true,
            sexo: 'M',
            edad: 45,
            discapacidad: 'N',
            campaniaVacunacion: false,
            campaniaCompartiSalud: false,
            parentesco: 0,
            linea: 'N'
        },
        {
            name: 'Socio con Discapacidad - Plan 2000',
            plan: 'SANCOR 2000',
            esTitular: true,
            sexo: 'F',
            edad: 35,
            discapacidad: 'S',
            campaniaVacunacion: true,
            campaniaCompartiSalud: false,
            parentesco: 0,
            linea: 'N'
        },
        {
            name: 'Adherente - No Titular',
            plan: 'SANCOR 4000',
            esTitular: false,
            sexo: 'F',
            edad: 25,
            discapacidad: 'N',
            campaniaVacunacion: false,
            campaniaCompartiSalud: true,
            parentesco: 1,
            linea: 'N'
        },
        {
            name: 'Socio Empresa - Plan 5000',
            plan: 'SANCOR 5000',
            esTitular: true,
            sexo: 'M',
            edad: 50,
            discapacidad: 'N',
            campaniaVacunacion: true,
            campaniaCompartiSalud: false,
            parentesco: 0,
            linea: 'E'
        }
    ];

    selectedUser: UserProfile | null = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    selectUser(user: UserProfile) {
        this.selectedUser = user;
        this.error = '';
        this.login();
    }

    login() {
        if (!this.selectedUser) {
            this.error = 'Por favor selecciona un perfil de usuario';
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.loadPermissions(
            this.selectedUser.plan,
            this.selectedUser.esTitular,
            this.selectedUser.sexo,
            this.selectedUser.edad,
            this.selectedUser.discapacidad,
            this.selectedUser.campaniaVacunacion,
            this.selectedUser.campaniaCompartiSalud,
            this.selectedUser.parentesco,
            this.selectedUser.linea
        ).subscribe({
            next: (response) => {
                console.log('Permisos cargados:', response);
                this.loading = false;
                this.router.navigate(['/menu']);
            },
            error: (err) => {
                console.error('Error al cargar permisos:', err);
                this.error = 'Error al conectar con el servidor. Asegúrate de que el backend esté ejecutándose en http://localhost:8082';
                this.loading = false;
            }
        });
    }
}
