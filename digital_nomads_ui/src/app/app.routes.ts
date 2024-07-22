import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { Component } from '@angular/core';

@Component({
  template: '<h1>Welcome to the main content!</h1>',
  standalone: true
})
export class MainContentComponent {}

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: MainContentComponent },
];