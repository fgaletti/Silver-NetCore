import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModule, NgbRatingConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  images = [1, 2, 3].map(() => 'https://picsum.photos/900/500?random&t=${Math.random()}');

  images2 = ['../../../assets/couch1.jpg', '../../../assets/banner_phones.jpg', '../../../assets/banner_technology.jpg'];

   listProducts: Product[];
   currentRate = 4.5;

   closeResult: string;
   @ViewChild('content') myModal: any;

  constructor(private alertify: AlertifyService, private productService: ProductService,  private config: NgbRatingConfig,
    private authService: AuthService, private modalService: NgbModal) {
        config.resettable = true;
        config.max = 5;
    // config.readonly = true;
  }

  ngOnInit() {
    this.getProductList();
    if (environment.isMoldalPopUpShowed === false) {
      environment.isMoldalPopUpShowed = true;
        setTimeout(() => {
        this.open(this.myModal);
      }, 1200);
    }
  }

  loggedAsAdmin() {
    return this.authService.loggedAsAdmin();
  }
    getProductList () {
    this.productService.getProductList().subscribe((products: Product[] )  => {
      console.log(products);
      this.listProducts = products;
    }, error => {
      this.alertify.error(error);
    }
    );
  }

  replaceUrl(urlImage: string) {
    if (environment.production) {
      return urlImage.replace('http://localhost:5000', environment.url);
    } else {
      return urlImage;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
