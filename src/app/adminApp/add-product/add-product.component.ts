import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css', '../../common/common.css']
})
export class AddProductComponent {

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'productType': ['', Validators.required],
      'productName': ['', Validators.required],
      'productDescription': ['', Validators.required],
      'qnt1': ['', Validators.required],
      'qnt2': ['', Validators.required],
      'qnt3': ['', Validators.required],
      'qnt4': ['', Validators.required],
    });
  }


  getError(el) {
    switch (el) {
      case 'productType':
        if (this.formGroup.get('productType').hasError('required')) {
          return 'Product Type Required';
        }
        break;

      case 'productName':
        if (this.formGroup.get('productName').hasError('required')) {
          return 'Product Name Required';
        }
        break;

      case 'productDescription':
        if (this.formGroup.get('productDescription').hasError('required')) {
          return 'Product Description Required';
        }
        break;

      case 'qnt1':
        if (this.formGroup.get('productDescription').hasError('required')) {
          return 'Product Amount Required';
        }
        break;

      case 'qnt2':
        if (this.formGroup.get('productDescription').hasError('required')) {
          return 'Product Amount Required';
        }
        break;

      case 'qnt3':
        if (this.formGroup.get('productDescription').hasError('required')) {
          return 'Product Amount Required';
        }
        break;

      case 'qnt4':
        if (this.formGroup.get('productDescription').hasError('required')) {
          return 'Product Amount Required';
        }
        break;

      default:
        return '';
    }
  }

  onSubmit(post) {
    // this.post = post;
    this.router.navigate(['/Store'])
  }

  countChange() { }

}