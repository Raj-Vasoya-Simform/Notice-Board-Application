import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements DoCheck {
  isLoggedIn = false;
  isAdminUser = false;

  constructor(private router: Router, private authService: AuthService) {}

  // DoCheck Hook
  ngDoCheck(): void {
    let currentUrl = this.router.url;

    // Checking for user is loggedIn or not
    if (currentUrl == '/auth/login' || currentUrl == '/auth/register') {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    // Checking user's role.
    if (this.authService.getUserRole() === 'admin') {
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
  }
}
