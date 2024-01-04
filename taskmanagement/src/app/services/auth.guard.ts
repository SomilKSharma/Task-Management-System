import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(){    
    // Check if the user is authenticated
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // If not authenticated, redirect to the login page
      return this.router.createUrlTree(['/']);
    }
  }

}
@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(){    
    // Check if the user is authenticated
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      // If not authenticated, redirect to the login page
      return this.router.createUrlTree(['/dashboard/viewalltickets']);
    }
  }

}
