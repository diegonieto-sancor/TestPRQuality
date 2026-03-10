import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { HasAnyPermissionDirective } from '../../directives/has-any-permission.directive';

interface MenuItem {
    title: string;
    icon: string;
    permission: string;
    description: string;
    category: string;
}

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, HasPermissionDirective, HasAnyPermissionDirective],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    permissionsSet: Set<string> = new Set(); // For fast lookups
    permissionsArray: string[] = []; // For template iteration

    menuItems: MenuItem[] = [
        // Gestiones
        { title: 'Mi Cuenta', icon: '👤', permission: 'VER_MI_CUENTA', description: 'Datos personales y configuración', category: 'Gestiones' },
        { title: 'Reintegros', icon: '💰', permission: 'VER_REINTEGROS', description: 'Solicitar reintegros de gastos', category: 'Gestiones' },

        // Programas de Salud
        { title: 'Plan Materno Infantil', icon: '🤰', permission: 'VER_PMI', description: 'Programa para embarazadas', category: 'Programas de Salud' },
        { title: 'Salud Reproductiva', icon: '💊', permission: 'VER_SALUD_REPRODUCTIVA', description: 'Programa de salud reproductiva', category: 'Programas de Salud' },
        { title: 'IVE', icon: '🏥', permission: 'VER_IVE', description: 'Interrupción Voluntaria del Embarazo', category: 'Programas de Salud' },
        { title: 'Programa Discapacidad', icon: '♿', permission: 'VER_DISCAPACIDAD', description: 'Servicios para personas con discapacidad', category: 'Programas de Salud' },
        { title: 'Programa Celiaquia', icon: '🌾', permission: 'VER_CELIAQUIA', description: 'Programa para celíacos', category: 'Programas de Salud' },

        // Espacio Familia
        { title: 'Kit Bebé', icon: '🍼', permission: 'VER_KIT_BEBE', description: 'Solicitar kit para recién nacidos', category: 'Espacio Familia' },
        { title: 'Solicitud de Cremas', icon: '🧴', permission: 'VER_SOLICITUD_CREMAS', description: 'Cremas especiales para embarazadas', category: 'Espacio Familia' },
        { title: 'Células Madre', icon: '🧬', permission: 'VER_CELULAS_MADRE', description: 'Extracción y conservación', category: 'Espacio Familia' },
        { title: 'Ecografías 3D/4D/5D', icon: '📸', permission: 'VER_ECO_3D_4D_5D', description: 'Ecografías de alta definición', category: 'Espacio Familia' },

        // Servicios
        { title: 'Asistencia al Viajero', icon: '✈️', permission: 'VER_ASISTENCIA_VIAJERO', description: 'Cobertura en viajes', category: 'Servicios' },
        { title: 'Traslados', icon: '🚑', permission: 'VER_TRASLADOS', description: 'Servicio de traslados médicos', category: 'Servicios' },
        { title: 'Compartí Salud', icon: '🤝', permission: 'VER_COMPARTI_SALUD', description: 'Programa solidario', category: 'Servicios' },

        // Campañas
        { title: 'Vacunación Antigripal', icon: '💉', permission: 'VER_VACUNACION_ANTIGRIPAL', description: 'Campaña de vacunación', category: 'Campañas' }
    ];

    categories: string[] = [];

    constructor(
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.permissions$.subscribe(perms => {
            console.log('MenuPermissions received:', perms);
            this.permissionsSet = perms;
            this.permissionsArray = Array.from(perms);
        });

        // Obtener categorías únicas
        this.categories = [...new Set(this.menuItems.map(item => item.category))];
    }

    getItemsByCategory(category: string): MenuItem[] {
        return this.menuItems.filter(item => item.category === category);
    }

    getVisibleItemsCount(): number {
        return this.menuItems.filter(item => this.permissionsSet.has(item.permission)).length;
    }

    hasVisibleItemsInCategory(category: string): boolean {
        return this.getItemsByCategory(category).some(item => this.permissionsSet.has(item.permission));
    }

    navigateToPermissions() {
        this.router.navigate(['/permissions']);
    }

    logout() {
        this.router.navigate(['/login']);
    }
}
