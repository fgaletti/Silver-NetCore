import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/_models/product';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})


export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  product: Product;

  // add picture
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  imageLoaded = false; // flag to indicate if the photo has been uploaded into the server
  productImageUrl = '';
  @ViewChild('fileInput') fileInput: any;

  listCategories: Category[];

  constructor(private alertify: AlertifyService,
    private fb: FormBuilder , private categoryService: CategoryService, private productService: ProductService,
      private router: Router) { }

  ngOnInit() {
    this.createProductForm();
    this.initializeUploader();
    this.getCategoryList();
  }



  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((categories: Category[]) => {
      this.listCategories = categories;
    }, error => {
      this.alertify.error(error);
    }
    );
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
      this.uploader = new FileUploader({
        url: this.baseUrl + 'products/AddImageProduct',
        // auto  authTokenHeader:  'authorization',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        // itemAlias:  'fileeeee.jpg' ,
        maxFileSize: 10 * 1024 * 1024
      });
      this.uploader.onAfterAddingFile = (file) => {
        console.log('onAfterAddingFile');
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

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
       item.withCredentials = false;
       console.log('ngAfterViewInit');
    });
 }

  deleteImage() {
    // delete image added to the product
    this.imageLoaded = false;
    this.productImageUrl = '';
  }


  createProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^-?[0-9]+(.[0-9]+)?$')]],
      sku: ['', Validators.required],
      isActive: [true],
      avatar: []
    });
  }

  createProduct() {
    this.product = Object.assign({}, this.productForm.value) ; // pass the values
    this.product.shortDescription = this.product.description;
    this.product.isActive = this.productForm.get('isActive').value === true ? 1 : 0;
    this.product.urlImage = this.productImageUrl === '' ? null : this.productImageUrl;

    this.productService.createProduct(this.product).subscribe (
       () => {
           this.alertify.success('new product added');
    }, error => {
      this.alertify.error(error);
    }, () => {
        this.router.navigate(['/product-list']);
    });


    this.alertify.message(this.product.name ) ;
  }

  getNewIdImage() {
    // get autonumeric Id from the database so that a new image does not collapse with another image
    return 1; // should go to a web api
  }

  onlyDecimalNumberKey(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
       }
    return true;
  }

  onFileSelected (event) {
     this.uploader.uploadAll(); // upload the image right away

  }

   selectCategoryClick(categoryId: any) {
      console.log(categoryId);
  }

}
