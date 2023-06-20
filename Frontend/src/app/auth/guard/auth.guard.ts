import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn()) {
      if (userRole === 'admin') {
        return true;
      } else if (route.routeConfig?.path === 'notice') {
        return true;
      } else {
        this.router.navigate(['/notice']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
