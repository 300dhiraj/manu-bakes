import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeliveryConfirmationDialogComponent } from "../dialog/delivery-confirmation-dialog/delivery-confirmation-dialog.component";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css", "../../common/common.css"],
})
export class StoreComponent implements OnInit {
  products: any = [];
  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.httpService.getProduct().subscribe((responseBody: any) => {
      if (responseBody.Success) {
        this.products = responseBody.Success.products;
      } else if (responseBody.Error) {
        this.httpService.HandleError(responseBody.Error);
      }
    });
  }

  countChange(event) {}

  deliveryOrderDialog(id) {
    const dialogRef = this.dialog.open(DeliveryConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.httpService
          .deleteProduct({ id: id })
          .subscribe((responseBody: any) => {
            if (responseBody.Success) {
              this.getProductList();
            } else if (responseBody.Error) {
              this.httpService.HandleError(responseBody.Error);
            }
          });
      }
    });
  }

  disableProduct(flag, id) {
    this.setProdFlag({
      id: id,
      disable: flag ? 1 : 0,
    });
  }

  outOfStock(flag, id) {
    this.setProdFlag({
      id: id,
      outOfStock: flag ? 1 : 0,
    });
  }

  setProdFlag(data: object) {
    this.httpService.setProductFlags(data).subscribe((responseBody: any) => {
      if (responseBody.Success) {
      } else if (responseBody.Error) {
        this.httpService.HandleError(responseBody.Error);
      }
    });
  }
}
