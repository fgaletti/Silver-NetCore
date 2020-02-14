import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ValueComponent } from './value/value.component';
import { AlertifyService } from './services/alertify.service';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { CategoryService } from './services/category.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductListEditComponent } from './products/product-list-edit/product-list-edit.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './services/auth.service';

export function tokenGetter() {
   return localStorage.getItem('token');
 }

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      ValueComponent,
      HomeComponent,
      ProductListComponent,
      LoginComponent,
      ProductCreateComponent,
      ProductDetailComponent,
      ProductEditComponent,
      ProductListEditComponent /* list of products, edit */
   ],
   imports: [
      NgbModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000', 'http://testdomainlinux.com' ],
            blacklistedRoutes: ['localhost:5000/api/auth']
          }
         }) // * send token to avoid --> 'Authorization' : 'Bearer ' */
   ],
   providers: [
      AlertifyService,
      AuthService,
      ErrorInterceptorProvider,
      AuthGuard,
      ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
