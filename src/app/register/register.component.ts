import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userName = '';
  password = '';
  confirmPassword = '';
  emailAddress = '';

  error = '';
  success = '';

  constructor(private auth: Auth, private router: Router) {
    // no other statements required
  }

  register(form: NgForm) {

    if (this.password != this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.auth.register({userName: this.userName, password: this.password, emailAddress: this.emailAddress})
      .subscribe({
        next: res => {
          this.success = 'Registration successful! You can now login.';
          // this.router.navigate(['/contacts']); // temporary but to be changed to the login once created
          this.router.navigate(['/login']); // redirect to login form
        },
        error: err => {
          this.error = err.error?.message || 'registration failed.';
        }
      });
  }

}
