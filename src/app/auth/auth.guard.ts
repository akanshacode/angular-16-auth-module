// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Retrieve stored credentials from local storage
    let data:any=localStorage.getItem('credentials')
    const storedCredentials = JSON.parse(data) || [];

    if (storedCredentials.length > 0) {
      return true; // Allow access to the dashboard if credentials are present
    } else {
      this.router.navigate(['/login']); // Redirect to login if no credentials are found
      return false;
    }
  }
}

