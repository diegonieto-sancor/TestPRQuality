import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

/**
 * Directiva estructural que muestra/oculta elementos si el usuario tiene
 * AL MENOS UNO de los permisos especificados
 * 
 * Uso:
 * <div *appHasAnyPermission="['VER_PMI', 'VER_DISCAPACIDAD']">
 *   Contenido visible si tiene PMI O Discapacidad
 * </div>
 */
@Directive({
    selector: '[appHasAnyPermission]',
    standalone: true
})
export class HasAnyPermissionDirective implements OnInit, OnDestroy {
    @Input() appHasAnyPermission!: string[];
    private permissionSubscription?: Subscription;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.permissionSubscription = this.authService.permissions$.subscribe(() => {
            this.updateView();
        });
    }

    ngOnDestroy() {
        this.permissionSubscription?.unsubscribe();
    }

    private updateView() {
        const hasAnyPermission = this.authService.hasAnyPermission(this.appHasAnyPermission);

        if (hasAnyPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
