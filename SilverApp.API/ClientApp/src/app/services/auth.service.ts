import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseUrl =  environment.apiUrl +  'Users/';
   baseUrl =  environment.apiUrl +  'Auth/';

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register' , user);
  }

  loggedIn() {
    // if token is not expired the user is logged in
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  loggedAsAdmin() {
    // if token is not expired the user is logged in

    const token = localStorage.getItem('token');
    if (!this.jwtHelper.isTokenExpired(token)) {
       // user is logged in, now check if user is Admin
       const data = JSON.parse(localStorage.getItem('user'));
       if (data != null) {
           if (data['isAdmin'] === 1) {
            // console.log('userr --->isAdmin' );
              return true;
          } else {
            // console.log(data['isAdmin']);
            return false;
          }
       } else {
         return false;
       }
    }
  }

  // 2 objects are recieved, token and user
  login(model: any) {
    console.log(model);
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
       map((response: any) => {
           const user = response;
           if (user) {
             localStorage.setItem('token', user.token);
             localStorage.setItem('user', JSON.stringify(user.user));
             this.decodedToken = this.jwtHelper.decodeToken(user.token);
             console.log('decodedToken' + this.decodedToken);
             this.currentUser = user.user;
           }
       })
    );
  }
}
