
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust as needed
  private tokenKey = 'authToken'; // Key for storing the authentication token in localStorage

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setAuthToken(response.token);
          }
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  logout(): Observable<any> {
    console.log('Call netgid');
    const value = this.http.post<any>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearAuthToken()
        }),
        catchError(this.handleError<any>('logout'))
    );
    // Subscribe to the observable
    value.subscribe(
      data => {
        // Handle the successful response if needed
        console.log('Logout successful', data);
      },
      error => {
        // Handle the error if needed
        console.error('Logout failed', error);
      }
    );
    return value;
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  getUsername(): string | null {
    const token = this.getAuthToken();
    if (token) {
      // Decode the token to get user information
      // Example: const user = jwt_decode(token);
      // return user.username;
      return 'exampleUsername';
    }
    return null;
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

  // Add additional error handling logic
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
