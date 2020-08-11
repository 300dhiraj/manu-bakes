import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { CancelConfirmationDialogComponent } from "../dialog/cancel-confirmation-dialog/cancel-confirmation-dialog.component";
import { DeliveryConfirmationDialogComponent } from "../dialog/delivery-confirmation-dialog/delivery-confirmation-dialog.component";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-order",
  templateUrl: "./view-order.component.html",
  styleUrls: ["./view-order.component.css", "../../common/common.css"],
})
export class ViewOrderComponent implements OnInit {
  order_id: number;
  order: OrderDetail = [];
  products;


  constructor(
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private httpService: HttpService,
    private router: Router
  ) {
    this.order_id = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.httpService
      .getOrderDetails({ orderId: this.order_id })
      .subscribe((responseBody: any) => {
        if (responseBody.Success) {
          this.order = {
            customerName: responseBody.Success.customerName,
            orderNumber: responseBody.Success.id,
            customerAddress: responseBody.Success.customerAddress,
            billAmount: responseBody.Success.billAmount,
            deliveryContact: responseBody.Success.contactNumber,
            deliveryStatus: responseBody.Success.deliveryStatus,
          };

          this.products = responseBody.Success.products;
        } else if (responseBody.Error) {
          this.httpService.HandleError(responseBody.Error);
        }
      });
  }

  cancelOrderDialog() {
    const dialogRef = this.dialog.open(CancelConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateOrderStatus("Cancaled");
      }
    });
  }

  deliveryOrderDialog() {
    const dialogRef = this.dialog.open(DeliveryConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateOrderStatus("Delivered");
      }
    });
  }

  updateOrderStatus(status) {
    this.httpService
      .UpdateDeliveryStatus({ orderId: this.order_id, status: status })
      .subscribe((responseBody: any) => {
        if (responseBody.Success) {
          this.router.navigate(["/Dashboard"]);
        } else if (responseBody.Error) {
          this.httpService.HandleError(responseBody.Error);
        }
      });
  }

  countChange(event) {}
}

export interface OrderDetail {
  customerName: string;
  orderNumber: number;
  customerAddress: string;
  billAmount: number;
  deliveryContact: number;
  deliveryStatus: string;
}

/*
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class DialogContentExampleDialog { }*/
