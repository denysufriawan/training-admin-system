import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.css']
})
export class PeriodListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.noConflict();
    $('#training-period-table').DataTable();
  }

}
