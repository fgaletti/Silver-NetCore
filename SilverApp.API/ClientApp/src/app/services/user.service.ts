import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 'http://localhost:5000/api/'
  baseUrl =  environment.apiUrl +  'Users/';
  // baseUrl =  environment.apiUrl +  'Auth/';

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

constructor(private http: HttpClient) { }

/*register(user: User) {
  return this.http.post(this.baseUrl + 'register' , user);
}*/




}
