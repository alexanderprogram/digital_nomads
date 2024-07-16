import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];