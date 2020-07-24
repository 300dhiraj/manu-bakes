import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.admin.component.html',
  styleUrls: ['./header.admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  showFilter: boolean = false;
  showAddStore: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.showFilter = this.route.snapshot.url[0].path == 'Dashboard';
    this.showAddStore = this.route.snapshot.url[0].path == 'Store';
  }

  @Output() change = new EventEmitter();

  filter(status) {
    this.change.emit(status);
  }

}
