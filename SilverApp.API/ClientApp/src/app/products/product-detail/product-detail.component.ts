import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductImageService } from 'src/app/services/product-image.service';
import { Product } from 'src/app/_models/product';
import { Productimage } from 'src/app/_models/productimage';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product; // hold product name, detail
  productForm: FormGroup;
  listProductImages: Productimage[]; // list of product-images
  urlImageSelected: string; // image shown in the modalpopup
  closeResult: string;
  @ViewChild('content') myModal: any;

  constructor(private alertify: AlertifyService, private route: ActivatedRoute,
    private productService: ProductService,  private productImageService: ProductImageService
    ,  private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadProduct();
    this.createProductForm();
    this.getProductList (this.route.snapshot.params['id']);
  }


  // product /4
  loadProduct() {
    this.productService.getProduct(this.route.snapshot.params['id']).subscribe((product: Product) => {
      this.product = product;

    }, error => {
      this.alertify.error(error);
    });
  }

  createProductForm() {
    this.productForm = this.fb.group({
      productId: ['']
    });
  }

  getProductList (id: number) {
    this.productImageService.getProductImageListById(id)
        .subscribe((productImages: Productimage[]) => {
          this.listProductImages = productImages ;
    }, error => {
      this.alertify.error(error);
    }
    );
  }

  showModalPopupImage(urlImage: string) {
    this.urlImageSelected = urlImage;
    this.open(this.myModal);
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

  replaceUrl(urlImage: string) {
    if (environment.production) {
      return urlImage.replace('http://localhost:5000', 'http://testdomainlinux.com');
    } else {
      return urlImage;
    }
  }

}
