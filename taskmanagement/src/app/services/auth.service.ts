import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'authToken';
  private userKey = 'loggedInUser'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap(response => {
          if (response.token) {
            // Set authentication token
            this.setAuthToken(response.token);

            // Set user details
            this.setLoggedInUser(response.userId); // Adjust based on your API response structure
          }
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  logout(): Observable<any> {
    const value = this.http.post<any>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          // Clear authentication token and user details on logout
          this.clearAuthToken();
          this.clearLoggedInUser();
        }),
        catchError(this.handleError<any>('logout'))
      );

    value.subscribe(
      data => {
        console.log('Logout successful', data);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
    return value;
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }


  getUserId(): number | null {
    const user = this.getLoggedInUser();
    console.log(user);
    return user ? user : null;
  }

  private setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearAuthToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private setLoggedInUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getLoggedInUser(): any {
    const userString = localStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }

  private clearLoggedInUser(): void {
    localStorage.removeItem(this.userKey);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
