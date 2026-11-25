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
          this.clearLockoutTimer();
          this.auth.setAuth(true);
          localStorage.setItem('username', this.userName);
          this.router.navigate(['/contacts']);
        }
        else {
          this.errorMessage = res.message || 'Login failed. Please try again.';
        }
      },
      error: err => {
        // more code to come
        this.errorMessage = 'Server error during login. Please try again.';
        console.log("Inside login component.ts error; err");

        if (err.status === 403) {
          // Account locked: Extract minutes from back end message
          const msg = err.error?.error || 'Account locked. Please wait.';
          this.errorMessage = msg;

          const match = msg.match(/in (\d+) minute/);
          if (match) {
            this.remainingMinutes = parseInt(match[1], 10);
            this.startLockoutCountdown();
          }
        }
        else if (err.status === 401) {
          const remaining = err.error?.remainingAttempts ?? null;
          if (remaining !== null && remaining > 0) {
            this.errorMessage = `Invalid username or password. You have ${remaining} attempt(s) remaining before lockout.`;
          }
          else {
            this.errorMessage = "Invalid username or password.";
          }
        }
        else if (err.status === 404) {
          this.errorMessage = "User not found.";
        }
      }
    });
  }

  startLockoutCountdown() {
    this.clearLockoutTimer();

    this.lockoutTimer = setInterval(() => {
      if (this.remainingMinutes > 1) {
        this.remainingMinutes--;
        this.errorMessage = `Account locked. Try again in ${this.remainingMinutes} minute(s).`;
      }
      else {
        this.clearLockoutTimer();
        this.errorMessage = '';
      }
    }, 60000);
  }

  clearLockoutTimer() {
    if(this.lockoutTimer) {
      clearInterval(this.lockoutTimer);
      this.lockoutTimer = null;
    }
  }

}
