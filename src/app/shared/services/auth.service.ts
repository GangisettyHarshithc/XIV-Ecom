import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$.asObservable();
  }

  private loadCurrentUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser$.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<any> {
    // Mock login - replace with actual API call
    const user = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
    };
    return of(user).pipe(
      delay(500),
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser$.next(user);
      })
    );
  }

  logout(): Observable<void> {
    return of(void 0).pipe(
      delay(300),
      tap(() => {
        localStorage.removeItem('user');
        this.currentUser$.next(null);
      })
    );
  }

  signup(userData: any): Observable<any> {
    // Mock signup - replace with actual API call
    return of(userData).pipe(
      delay(500),
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser$.next(user);
      })
    );
  }
}
