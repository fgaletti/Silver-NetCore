import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    private  alertify: AlertifyService) {}


  canActivate (): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    // user is not logged in
    this.alertify.error('You are not authorized');
    this.router.navigate(['/home']);
    return false;
  }
}
