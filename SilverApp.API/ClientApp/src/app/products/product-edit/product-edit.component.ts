import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Product } from 'src/app/_models/product';
import { Productimage } from 'src/app/_models/productimage';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductImageService } from 'src/app/services/product-image.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productImage: Productimage;
  product: Product; // hold product name.
  listProductImages: Productimage[]; // list of product-images

  productForm: FormGroup;

  imageLoaded = false; // flag to indicate if the photo has been uploaded into the server

  productImages: Productimage[] = [];
  productImageUrl = '';

   // add picture
   baseUrl = environment.apiUrl;
   uploader: FileUploader;
   @ViewChild('fileInput') fileInput: any;
   descriptionInput: string;

  constructor(private alertify: AlertifyService, private route: ActivatedRoute,
    private productService: ProductService,  private productImageService: ProductImageService
    ,  private fb: FormBuilder) { }

  ngOnInit() {
    this.createProductForm();
    this.loadProduct();
    // this.loadProductImages();
    this.getProductList (this.route.snapshot.params['id']);
    this.initializeUploader();
  }

  loadProductImages() {
    let image = new Productimage();
    image.urlImage = '../../../assets/couch1.jpg';
    this.productImages.push(image);

     image = new Productimage();
    image.urlImage = '../../../assets/banner_phones.jpg';
    this.productImages.push(image);

    image = new Productimage();
    image.urlImage = '../../../assets/banner_phones.jpg';
    this.productImages.push(image);

    // = ['../../../assets/couch1.jpg', '../../../assets/banner_phones.jpg', '../../../assets/deco1.jpg'];
  }

  // product /4
   loadProduct() {
    this.productService.getProduct(this.route.snapshot.params['id']).subscribe((product: Product) => {
      this.product = product;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteImage(id: number) {
    // this.productImages.pop()
    // delete image added to the product
    this.imageLoaded = false;
    this.productImageUrl = '';
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/AddImageProduct',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        // const res: Photo = JSON.parse(response);
        // const res = JSON.parse(response);
        console.log('response');
        this.imageLoaded = true;
        this.productImageUrl = 'http://' + response;
        this.fileInput.nativeElement.value = ''; // clean the fileuploa s that we can add the same file again
        console.log(response);
      }
    };
}

  onFileSelected (event) {
    this.uploader.uploadAll();

  }


  // add image
  createProduct() {
    this.productImage = Object.assign({}, this.productForm.value) ; // pass the values
    this.productImage.id = 0;
    this.productImage.productId = this.productForm.get('productId').value;
    this.productImage.urlImage = this.productImageUrl === '' ? null : this.productImageUrl;
    this.productImageService.createProductImage(this.productImage).subscribe (
       () => {
           this.alertify.success('new image added');
           // clear image
           this.imageLoaded = false;
           this.productImageUrl = '';
           this.descriptionInput = ''; // access to html input
           // load new images
    }, error => {
      this.alertify.error(error);
    }, () => {
        // this.router.navigate(['/product-list']);
    });
    this.alertify.message(this.productImage.description ) ;
  }

  createProductForm() {
    this.productForm = this.fb.group({
      productId: [''],
      description: ['']
    });
  }

  getProductList (id: number) {
    this.productImageService.getProductImageListById(id).subscribe((productImages: Productimage[]) => {
      this.listProductImages = productImages;
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

}
