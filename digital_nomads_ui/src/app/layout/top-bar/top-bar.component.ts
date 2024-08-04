import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

interface User {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter<void>();

  websiteName = 'Digital_Nomad';
  user: User | null = null;
  fetchError: string | null = null;
  isUserMenuOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<User>('http://localhost:8080/api/user')
      .pipe(
        catchError(error => {
          console.error('Error fetching user data:', error);
          this.fetchError = 'Failed to fetch user data';
          return of(null);
        })
      )
      .subscribe(user => {
        this.user = user;
      });
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.logoutEvent.emit();
    this.user = null;
    this.isUserMenuOpen = false;
  }
}