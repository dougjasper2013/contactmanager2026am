import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class Auth {
  baseUrl = 'http://localhost/contactapi2026am';

  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { 
    // no statements required
  }  

  register(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register.php`, user);
  }
  
  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}/login.php`, user);
  }

  logout() {
    return this.http.get(`${this.baseUrl}/logout.php`).subscribe(() => {
      // more code to come
      this.isAuthenticated = false;
      localStorage.removeItem('auth');
      this.router.navigate(['/login']);
    });
  }

  checkAuth() {
    return this.http.get<any>(`${this.baseUrl}checkAuth.php`);
  }

  setAuth(auth: boolean) {
    this.isAuthenticated = auth;
    localStorage.setItem('auth', auth ? 'true' : 'false');
  }

  getAuth(): boolean {
    return localStorage.getItem('auth') == 'true';
  }
  
}
