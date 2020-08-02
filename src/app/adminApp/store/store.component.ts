import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeliveryConfirmationDialogComponent } from "../dialog/delivery-confirmation-dialog/delivery-confirmation-dialog.component";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css", "../../common/common.css"],
})
export class StoreComponent implements OnInit {
  products: any = [];
  constructor(public dialog: MatDialog, private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getProduct().subscribe((responseBody: any) => {
      console.log("responseBody : ", responseBody);
      if (responseBody.Success) {
        console.log("responseBody.products : ", responseBody.Success.products);
        this.products = responseBody.Success.products;
      } else if (responseBody.Error) {
        console.log(responseBody.Error);
      }
    });
  }

  countChange(event) {}

  deliveryOrderDialog() {
    const dialogRef = this.dialog.open(DeliveryConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  disableProduct(flag, id) {
    console.log("RES", flag, id);
  }

  outOfStock(flag, id) {
    console.log("RES", flag, id);
  }
}
