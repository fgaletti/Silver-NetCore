import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  baseUrl =  environment.apiUrl +  'productimages/';
    constructor(private http: HttpClient) { }

    createProductImage(model: any) {
      return this.http.post(this.baseUrl + 'AddImageForProduct', model);
    }

    // There is no function overloading in typescript so we need to change the name of the function
    getProductImageListById(id: number) {
      console.log(this.baseUrl + 'list/' + id);
      return this.http.get(this.baseUrl + 'list/' + id );
    }

    getProductImageList() {
      return this.http.get(this.baseUrl );
    }

}
