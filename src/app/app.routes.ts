import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PermissionConditionsComponent } from './components/permission-conditions/permission-conditions.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'permissions', component: PermissionConditionsComponent },
    { path: '**', redirectTo: '/login' }
];
