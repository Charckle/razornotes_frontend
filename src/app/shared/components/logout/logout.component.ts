import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  template: '<p>Logging out...</p>',
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    // Perform logout logic (clear token, etc.)
    this.authService.logout();

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
