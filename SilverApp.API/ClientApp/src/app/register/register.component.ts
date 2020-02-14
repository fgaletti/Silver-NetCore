import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { User } from '../_models/user';
 import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';


  constructor( private alertify: AlertifyService,
    private fb: FormBuilder , private authService: AuthService,  private router: Router) { }

  ngOnInit() {
     this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator} );
  }

  register () {
    if (this.registerForm.valid) {
      // move the vslues from this.registerForm.value to {}
      this.user = Object.assign({}, this.registerForm.value) ;
      this.authService.register(this.user).subscribe( () => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => { // third part , complete, we nee to redirect the user once they have register
          this.authService.login(this.user).subscribe ( () => {
                this.router.navigate(['/product-list']);
                console.log('login/member');
              }
          );
      });
    }
  }

  // 123
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }


}
