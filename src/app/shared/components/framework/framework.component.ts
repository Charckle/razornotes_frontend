import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styles: [
  ]
})

export class FrameworkComponent {
  useBootstrapStyles: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the login route
        this.useBootstrapStyles = !event.url.includes('/login');
      }
    });
  }

}
