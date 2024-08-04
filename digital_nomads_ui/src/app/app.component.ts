import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthComponent } from './auth/auth/auth.component';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './layout/main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    TopBarComponent, 
    SidebarComponent, 
    AuthComponent,
    MainContentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digital_nomads_ui';
  isLoggedIn: boolean = false;

  onLoginSuccess() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}