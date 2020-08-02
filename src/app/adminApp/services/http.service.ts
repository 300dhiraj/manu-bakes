import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  apiBaseUrl = "http://localhost/Api/index.php?";

  constructor(private httpClient: HttpClient) {}

  sendGetRequest() {
    return this.httpClient.get(this.apiBaseUrl);
  }

  loginRequest(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiBaseUrl + "Login", data);
  }
}
