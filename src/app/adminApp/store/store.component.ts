import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryConfirmationDialogComponent } from '../dialog/delivery-confirmation-dialog/delivery-confirmation-dialog.component';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css', '../../common/common.css']
})
export class StoreComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  countChange(event) { }

  deliveryOrderDialog() {
    const dialogRef = this.dialog.open(DeliveryConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
