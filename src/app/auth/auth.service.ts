import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

// Interface for user data
export interface UserData {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // This is a mock implementation. In a real app, you would connect to a backend service
  // or use Firebase Authentication or similar service.

  constructor() { }

  signInWithCredentials(email: string, password: string): Observable<any> {
    // Mock implementation - replace with actual authentication logic
    console.log('Signing in with:', email, password);

    // Simulate API call with delay
    if (email === 'test@example.com' && password === 'password123') {
      return of({ success: true, user: { email, name: 'Test User' } }).pipe(delay(1500));
    } else {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(1500));
    }
  }

  signInWithGoogle(): Observable<any> {
    // Mock implementation - replace with actual Google authentication
    console.log('Signing in with Google');

    // Simulate API call with delay
    return of({
      success: true,
      user: {
        email: 'google@example.com',
        name: 'Google User'
      }
    }).pipe(delay(1500));
  }

  register(userData: UserData): Observable<any> {
    // Mock implementation - replace with actual registration logic
    console.log('Registering user:', userData);

    // Simulate API call with delay
    return of({
      success: true,
      user: {
        email: userData.email,
        name: userData.fullName
      }
    }).pipe(delay(1500));
  }

  // Additional methods you might need
  logout(): Observable<any> {
    console.log('Logging out');
    return of({ success: true }).pipe(delay(500));
  }

  getCurrentUser(): Observable<any> {
    // Get the current user from local storage or session
    const user = localStorage.getItem('currentUser');
    return of(user ? JSON.parse(user) : null);
  }
}
