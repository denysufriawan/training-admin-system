import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $.noConflict();
    // $('#active-training-table').DataTable();
    // $('#bcc-schedule-table').DataTable();
  }

}
