import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.error = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.login();
    } else {
      if (!this.validatePassword()) {
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }
      this.signUp();
    }
  }

  validatePassword(): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      this.error = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
      return false;
    }
    return true;
  }

  login() {
    if (!this.validateEmail()) {
      return;
    }
    this.http.post('http://localhost:8080/api/auth/login', { email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.error = 'Login failed. Please check your credentials.';
        }
      });
  }

  signUp() {
    if (!this.validateEmail()) {
      return;
    }
    this.http.post('http://localhost:8080/api/auth/signup', { email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Signup successful', response);
          this.isLoginMode = true;
        },
        error: (error) => {
          console.error('Signup failed', error);
          this.error = 'Signup failed. Please try again.';
        }
      });
  }

  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid email address.';
      return false;
    }
    return true;
  }
}