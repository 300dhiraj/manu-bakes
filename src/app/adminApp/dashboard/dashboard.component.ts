import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css", "../../common/common.css"],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    /*'select',*/ "id",
    "customerName",
    "customerAddress",
    "billAmount",
    "contactNumber",
    "deliveryStatus",
    "view",
  ];
  dataSet: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.dataSet);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getOrders().subscribe((responseBody: any) => {
      if (responseBody.Success) {
        this.dataSource = new MatTableDataSource<PeriodicElement>(
          responseBody.Success.orders
        );
        this.dataSource.paginator = this.paginator;

        this.dataSet = responseBody.Success.orders;
      } else if (responseBody.Error) {
        this.httpService.HandleError(responseBody.Error);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  countChange(event) {
    let DATA = event
      ? this.dataSet.filter((order) => {
          if (order.deliveryStatus == event) {
            return order;
          }
        })
      : this.dataSet;
    this.dataSource = new MatTableDataSource<PeriodicElement>(DATA);
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  customerName: string;
  id: number;
  customerAddress: string;
  billAmount: number;
  contactNumber: string;
  deliveryStatus: string;
}
