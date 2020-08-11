import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  apiBaseUrl = "http://localhost/manu-bakes/Api/index.php?";
  token = "";

  constructor(private httpClient: HttpClient, private router: Router) {}

  getHeader() {
    if (!this.token) {
      this.router.navigate(["/Admin"]);
    }

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: this.token,
    });

    return {
      headers: httpHeaders,
    };
  }

  HandleError(error: any) {
    if (error == "Your Login Name or Password is invalid") {
      this.router.navigate(["/Admin"]);
    }
  }

  sendGetRequest() {
    return this.httpClient.get(this.apiBaseUrl);
  }

  login(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiBaseUrl + "Login", data);
  }

  getProduct() {
    return this.httpClient.get(
      this.apiBaseUrl + "GetProduct",
      this.getHeader()
    );
  }

  addProduct(data: Object): Observable<Object> {
    return this.httpClient.post(
      this.apiBaseUrl + "AddProduct",
      data,
      this.getHeader()
    );
  }

  setProductFlags(data: Object): Observable<Object> {
    return this.httpClient.post(
      this.apiBaseUrl + "SetProductFlags",
      data,
      this.getHeader()
    );
  }

  deleteProduct(data: Object): Observable<Object> {
    return this.httpClient.post(
      this.apiBaseUrl + "deleteProduct",
      data,
      this.getHeader()
    );
  }

  getOrders() {
    return this.httpClient.get(this.apiBaseUrl + "GetOrders", this.getHeader());
  }

  getOrderDetails(data: Object) {
    return this.httpClient.post(
      this.apiBaseUrl + "GetOrderDetails",
      data,
      this.getHeader()
    );
  }

  UpdateDeliveryStatus(data: Object) {
    return this.httpClient.post(
      this.apiBaseUrl + "UpdateDeliveryStatus",
      data,
      this.getHeader()
    );
  }
}
