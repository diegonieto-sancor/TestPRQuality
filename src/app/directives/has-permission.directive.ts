import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

/**
 * Directiva estructural que muestra/oculta elementos basado en un permiso único
 * 
 * Uso:
 * <div *appHasPermission="'VER_PMI'">Contenido visible solo con permiso VER_PMI</div>
 */
@Directive({
    selector: '[appHasPermission]',
    standalone: true
})
export class HasPermissionDirective implements OnInit, OnDestroy {
    @Input() appHasPermission!: string;
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
        const hasPermission = this.authService.hasPermission(this.appHasPermission);

        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
