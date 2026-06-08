import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
      }
    }
  }

  login(email: string, password: string): boolean {
    // In a real app, you'd have real authentication logic via API
    if (email && password) {
      const user: User = {
        name: email.split('@')[0], // Use part of email as name for demo
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=6366f1&color=fff`
      };
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      this.userSubject.next(user);
      return true;
    }
    return false;
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
