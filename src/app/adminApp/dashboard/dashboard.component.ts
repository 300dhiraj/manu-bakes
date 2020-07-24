import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../common/common.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [/*'select',*/ 'orderNumber', 'customerName', 'customerAddress', 'billAmount', 'deliveryStatus', 'view'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.orderNumber + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  countChange(event) {
    let DATA = event ? ELEMENT_DATA.filter((order) => { if (order.deliveryStatus == event) { return order } }) : ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<PeriodicElement>(DATA);
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  customerName: string;
  orderNumber: number;
  customerAddress: string;
  billAmount: number;
  deliveryStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { orderNumber: 1, customerName: 'Hydrogen', billAmount: 1.0079, customerAddress: 'H', deliveryStatus: 'Pending' },
  { orderNumber: 2, customerName: 'Helium', billAmount: 4.0026, customerAddress: 'He', deliveryStatus: 'Pending' },
  { orderNumber: 3, customerName: 'Lithium', billAmount: 6.941, customerAddress: 'Li', deliveryStatus: 'Pending' },
  { orderNumber: 4, customerName: 'Beryllium', billAmount: 9.0122, customerAddress: 'Be', deliveryStatus: 'Pending' },
  { orderNumber: 5, customerName: 'Boron', billAmount: 10.811, customerAddress: 'B', deliveryStatus: 'Pending' },
  { orderNumber: 6, customerName: 'Carbon', billAmount: 12.0107, customerAddress: 'C', deliveryStatus: 'Pending' },
  { orderNumber: 7, customerName: 'Nitrogen', billAmount: 14.0067, customerAddress: 'N', deliveryStatus: 'Pending' },
  { orderNumber: 8, customerName: 'Oxygen', billAmount: 15.9994, customerAddress: 'O', deliveryStatus: 'Pending' },
  { orderNumber: 9, customerName: 'Fluorine', billAmount: 18.9984, customerAddress: 'F', deliveryStatus: 'Cancaled' },
  { orderNumber: 10, customerName: 'Neon', billAmount: 20.1797, customerAddress: 'Ne', deliveryStatus: 'Cancaled' },
  { orderNumber: 11, customerName: 'Sodium', billAmount: 22.9897, customerAddress: 'Na', deliveryStatus: 'Cancaled' },
  { orderNumber: 12, customerName: 'Magnesium', billAmount: 24.305, customerAddress: 'Mg', deliveryStatus: 'Cancaled' },
  { orderNumber: 13, customerName: 'Aluminum', billAmount: 26.9815, customerAddress: 'Al', deliveryStatus: 'Cancaled' },
  { orderNumber: 14, customerName: 'Silicon', billAmount: 28.0855, customerAddress: 'Si', deliveryStatus: 'Completed' },
  { orderNumber: 15, customerName: 'Phosphorus', billAmount: 30.9738, customerAddress: 'P', deliveryStatus: 'Completed' },
  { orderNumber: 16, customerName: 'Sulfur', billAmount: 32.065, customerAddress: 'S', deliveryStatus: 'Completed' },
  { orderNumber: 17, customerName: 'Chlorine', billAmount: 35.453, customerAddress: 'Cl', deliveryStatus: 'Completed' },
  { orderNumber: 18, customerName: 'Argon', billAmount: 39.948, customerAddress: 'Ar', deliveryStatus: 'Completed' },
  { orderNumber: 19, customerName: 'Potassium', billAmount: 39.0983, customerAddress: 'K', deliveryStatus: 'Completed' },
  { orderNumber: 20, customerName: 'Calcium', billAmount: 40.078, customerAddress: 'Ca', deliveryStatus: 'Completed' },
];

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */