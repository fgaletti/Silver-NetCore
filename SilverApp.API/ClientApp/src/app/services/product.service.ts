import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl =  environment.apiUrl +  'products/';

constructor(private http: HttpClient) { }

    createProduct(model: any) {
      return this.http.post(this.baseUrl + 'create', model);
    }

    getProductList() {
      return this.http.get(this.baseUrl );
    }

    // alternative with observable
    getProductListObs(): Observable<Product[]>   {
      return this.http.get<Product[]>(this.baseUrl );
    }

    // product/1
    getProduct(id): Observable<Product> {
      return this.http.get<Product>(this.baseUrl + id);
    }

    getCurrentIdImage() {
      return this.http.get<number>(this.baseUrl.replace('products/', '') + 'GetSequenceNextVal');
    }
}


