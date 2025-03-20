import { Routes } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './auth/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'system', component: SystemComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
