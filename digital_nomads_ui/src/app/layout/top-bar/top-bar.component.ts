import { Component, OnInit } from '@angular/core';
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
  websiteName = 'Digital_Nomad';
  user: User | null = null;
  fetchError: string | null = null;
  isUserMenuOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<User>('https://api.todo.com/user')
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
    console.log('Logout functionality not yet implemented');
  }
}