import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    } else {
      // If not logged in, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
