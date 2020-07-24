import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CancelConfirmationDialogComponent } from '../dialog/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { DeliveryConfirmationDialogComponent } from '../dialog/delivery-confirmation-dialog/delivery-confirmation-dialog.component';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css', '../../common/common.css']
})

export class ViewOrderComponent implements OnInit {

  product_id: number;
  order: OrderDetail;

  constructor(private actRoute: ActivatedRoute, public dialog: MatDialog) {
    this.product_id = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.order = {
      customerName: 'dhiraj',
      orderNumber: 101,
      customerAddress: 'Bgm',
      billAmount: 12,
      deliveryStatus: 'Pending',
    };
  }

  cancelOrderDialog() {
    const dialogRef = this.dialog.open(CancelConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deliveryOrderDialog() {
    const dialogRef = this.dialog.open(DeliveryConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  countChange(event) {
  }
}

export interface OrderDetail {
  customerName: string;
  orderNumber: number;
  customerAddress: string;
  billAmount: number;
  deliveryStatus: string;
}

/*
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class DialogContentExampleDialog { }*/