import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/users';
  private router = inject(Router);
  constructor() {}
  private http = inject(HttpClient);

  login(formData: any): Observable<any> {
    const { email, password } = formData;
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
