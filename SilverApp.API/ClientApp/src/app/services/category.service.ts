import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../_models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl =  environment.apiUrl +  'categories/';
  constructor(private http: HttpClient) { }

  getCategoryList() {
    return this.http.get(this.baseUrl );
  }

   // alternative with observable
  getCategoryListObs(): Observable<Category[]>   {
    return this.http.get<Category[]>(this.baseUrl );
  }
}
