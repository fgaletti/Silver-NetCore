import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  user: User;
  loginForm: FormGroup;

  constructor( private alertify: AlertifyService,
    private fb: FormBuilder , private authService: AuthService,  private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.model = Object.assign({}, this.loginForm.value) ;
    console.log(this.model);

    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully');
    // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);

       this.alertify.error(error); //  'Failed to login');
    }, () => {
      this.router.navigate(['/product-list']);
    }
    );
  }

}
