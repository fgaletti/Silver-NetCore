import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-edit',
  templateUrl: './product-list-edit.component.html',
  styleUrls: ['./product-list-edit.component.css']
})
export class ProductListEditComponent implements OnInit {

  listProducts: Product[];

  constructor(private alertify: AlertifyService, private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList () {
    this.productService.getProductList().subscribe((products: Product[]) => {
      this.listProducts = products;
    }, error => {
      this.alertify.error(error);
    }
    );
  }

  onSelect(productId: number) {
    this.router.navigate(['/product-edit/' + productId.toString()]);
  }

}
