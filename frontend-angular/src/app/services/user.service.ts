import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '@environments/environment';  // Ensure this path is correct
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface AuthResponse {
  token: string;
  userId: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }

  register(userData: any) {
    return this.http.post(`${environment.apiUrl}/register`, userData);

  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);//store token
          localStorage.setItem('userId', response.userId); // Store user ID        } else {
          console.error('Token not provided');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');  // Clears the stored JWT token
    this.router.navigate(['/login']);  // Redirects the user to the login page
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reset_password`, { email });
  }
  setNewPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reset_password/${token}`, { newPassword });
  }

}
