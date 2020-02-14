import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class NavComponent implements OnInit {
    public navbarCollapsed = true;

  constructor(private alertify: AlertifyService, private authService: AuthService,
    private router: Router) { }
    photoUrl: string;

  ngOnInit() {
  }

  loggedIn() {
    // if token is not expired the user is logged in
    return this.authService.loggedIn();
  }

  loggedAsAdmin() {
    return this.authService.loggedAsAdmin();
  }

  logout() {
    // remove the variables in the localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // 114
    // this.authService.decodedToken = null;
    // this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
