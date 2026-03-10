import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService, RuleDetail } from '../../services/permission.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission-conditions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Consultar Condiciones de Permisos</h2>
        <button class="btn btn-secondary" (click)="goBack()">Volver</button>
      </div>

      <div class="row">
        <!-- Selección de Permisos -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Permisos Otorgados</h5>
            </div>
            <div class="card-body" style="max-height: 500px; overflow-y: auto;">
              <div *ngIf="loading" class="text-center p-3">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>
              
              <div *ngIf="!loading && permissions.length === 0" class="alert alert-warning">
                No tienes permisos otorgados actualmente.
              </div>
              
              <div *ngIf="!loading && permissions.length > 0" class="list-group">
                <label *ngFor="let perm of permissions" class="list-group-item">
                  <input class="form-check-input me-2" type="checkbox" 
                         [value]="perm" 
                         (change)="onPermissionChange($event, perm)">
                  {{ perm }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Visualización de Condiciones -->
        <div class="col-md-8">
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">Condiciones Requeridas</h5>
            </div>
            <div class="card-body">
              <div *ngIf="selectedPermissions.length === 0" class="alert alert-info">
                Seleccione uno o más permisos para ver sus condiciones.
              </div>

              <div *ngFor="let item of conditionsMap | keyvalue" class="mb-4">
                <div class="card border-primary">
                  <div class="card-header bg-light">
                    <strong>{{ item.key }}</strong>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li *ngFor="let rule of item.value" class="list-group-item">
                      <div class="d-flex justify-content-between">
                          <span class="fw-bold text-primary">{{ rule.name }}</span>
                          <span class="badge bg-secondary">Prioridad {{ rule.priority }}</span>
                      </div>
                      <div class="mt-1">{{ rule.description }}</div>
                      <div class="mt-2 p-2 bg-light rounded border small">
                          <strong>Lógica:</strong> {{ rule.generatedLogic }}
                      </div>
                    </li>
                    <li *ngIf="item.value.length === 0" class="list-group-item text-muted fst-italic">
                      No hay condiciones específicas (acceso libre o definido por defecto).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-group-item {
      cursor: pointer;
    }
    .list-group-item:hover {
      background-color: #f8f9fa;
    }
  `]
})
export class PermissionConditionsComponent implements OnInit {
  permissions: string[] = [];
  selectedPermissions: string[] = [];
  conditionsMap: Map<string, RuleDetail[]> = new Map();
  loading: boolean = true;

  constructor(
    private permissionService: PermissionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.loading = true;
    // Obtenemos los permisos que TIENE el usuario
    const userPermissions = this.authService.getPermissions();

    // Convertimos a array y ordenamos
    this.permissions = Array.from(userPermissions).sort();
    this.loading = false;
  }

  onPermissionChange(event: any, permission: string): void {
    if (event.target.checked) {
      this.selectedPermissions.push(permission);
      this.loadConditions(permission);
    } else {
      const index = this.selectedPermissions.indexOf(permission);
      if (index > -1) {
        this.selectedPermissions.splice(index, 1);
        this.conditionsMap.delete(permission);
      }
    }
  }

  loadConditions(permission: string): void {
    this.permissionService.getConditions(permission).subscribe({
      next: (data) => {
        this.conditionsMap.set(permission, data.conditions);
      },
      error: (err) => {
        console.error(`Error loading conditions for ${permission}`, err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }
}
