import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🏥 Gestor de Reglas - SancorSalud</h1>
        <p>Sistema de permisos basado en Easy Rules</p>
      </header>
      
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="app-footer">
        <p>&copy; 2026 SancorSalud - Sistema de Gestión de Permisos</p>
      </footer>
    </div>
  `,
    styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .app-header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
    }

    .app-header p {
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      font-size: 1rem;
    }

    .app-main {
      flex: 1;
      padding: 2rem;
      background: #f5f7fa;
    }

    .app-footer {
      background: #2d3748;
      color: white;
      padding: 1rem;
      text-align: center;
      font-size: 0.875rem;
    }

    .app-footer p {
      margin: 0;
    }
  `]
})
export class AppComponent {
    title = 'Gestor de Reglas';
}
