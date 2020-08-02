import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css", "../../common/common.css"],
})
export class AdminComponent {
  formGroup: FormGroup;
  loginError = "";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getError(el) {
    switch (el) {
      case "user":
        if (this.formGroup.get("username").hasError("required")) {
          return "Username required";
        }
        break;
      case "pass":
        if (this.formGroup.get("password").hasError("required")) {
          return "Password required";
        }
        break;
      default:
        return "";
    }
  }

  onSubmit(post) {
    this.httpService.loginRequest(post).subscribe((responseBody: any) => {
      if (responseBody.Success) {
        this.router.navigate(["/Dashboard"]);
      } else if (responseBody.Error) {
        this.loginError = responseBody.Error;
      }
    });
  }
}
