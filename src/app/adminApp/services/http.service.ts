import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  apiBaseUrl = "http://localhost/manu-bakes/Api/index.php?";

  constructor(private httpClient: HttpClient) {}

  sendGetRequest() {
    return this.httpClient.get(this.apiBaseUrl);
  }

  login(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiBaseUrl + "Login", data);
  }

  getProduct() {
    return this.httpClient.get(this.apiBaseUrl + "GetProduct");
  }

  addProduct(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiBaseUrl + "AddProduct", data);
  }
}
