import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userName = '';
  password = '';

  errorMessage = '';

  lockoutTimer: any = null;
  remainingMinutes: number = 0;

  constructor(private auth: Auth, private router: Router) {
    // no other statements required
  }

  login() {
    this.auth.login({userName: this.userName, password: this.password}).subscribe({
      next: res => {
        console.log("Inside logim.component.ts res");
        if (res.success) {
          // this.clearLockoutTimer();
          // this.setAuth(true);
          // localStorage.setItem('username', this.userName);
          this.router.navigate(['/contacts']);
        }
        else {
          this.errorMessage = res.message || 'Login failed. Please try again.';
        }
      },
      error: err => {
        // more code to come
      }
    });
  }

  startLockoutCountdown() {

  }

  clearLockoutTimer() {

  }

}
