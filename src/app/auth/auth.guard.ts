import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const authDataString = localStorage.getItem('auth_data');

      if (authDataString) {
        try {
          const authData = JSON.parse(authDataString);
          const currentTime = new Date().getTime();

          if (authData.token && currentTime < authData.expiresAt) {
            return true;
          } else {
            localStorage.removeItem('auth_data');
          }
        } catch (error) {
          console.error('Error parsing auth data:', error);
        }
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
