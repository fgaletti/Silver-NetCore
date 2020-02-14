import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { ValueComponent } from './value/value.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductListEditComponent } from './products/product-list-edit/product-list-edit.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: ProductListComponent  },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard] },
    { path: 'product-list', component: ProductListComponent },
    { path: 'product-detail', component: ProductDetailComponent , canActivate: [AuthGuard]},
    { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: 'product-edit/:id', component: ProductEditComponent , canActivate: [AuthGuard]},
    { path: 'product-list-edit', component: ProductListEditComponent, canActivate: [AuthGuard] },
    { path: 'values', component: ValueComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
