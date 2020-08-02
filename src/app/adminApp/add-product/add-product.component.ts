import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css", "../../common/common.css"],
})
export class AddProductComponent {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.formGroup = this.formBuilder.group({
      productType: ["", Validators.required],
      productName: ["", Validators.required],
      productDescription: ["", Validators.required],
      price1: ["", Validators.required],
      price2: ["", Validators.required],
      price3: ["", Validators.required],
      price4: ["", Validators.required],
    });
  }

  getError(el) {
    switch (el) {
      case "productType":
        if (this.formGroup.get("productType").hasError("required")) {
          return "Product Type Required";
        }
        break;

      case "productName":
        if (this.formGroup.get("productName").hasError("required")) {
          return "Product Name Required";
        }
        break;

      case "productDescription":
        if (this.formGroup.get("productDescription").hasError("required")) {
          return "Product Description Required";
        }
        break;

      case "price1":
        if (this.formGroup.get("productDescription").hasError("required")) {
          return "Product Amount Required";
        }
        break;

      case "price2":
        if (this.formGroup.get("productDescription").hasError("required")) {
          return "Product Amount Required";
        }
        break;

      case "price3":
        if (this.formGroup.get("productDescription").hasError("required")) {
          return "Product Amount Required";
        }
        break;

      case "price4":
        if (this.formGroup.get("productDescription").hasError("required")) {
          return "Product Amount Required";
        }
        break;

      default:
        return "";
    }
  }

  onSubmit(post) {
    this.httpService.addProduct(post).subscribe((responseBody: any) => {
      if (responseBody.Success) {
        this.router.navigate(["/Store"]);
      } else if (responseBody.Error) {
        console.log(responseBody.Error);
      }
    });
  }

  countChange() {}
}
