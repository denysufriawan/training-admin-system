import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../_services/breadcrumb.service';
import { HeaderService } from '../_services/header.service';
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data:any;

  breadcrumbData: any = [
    {link:'',title:'Dashboard',icon:'dashboard'}
  ];

  headerData: any = [ 
    {title:'Dashboard',subtitle:'Display training course schedule information',icon:'dashboard'}
  ];

  constructor(private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService, private http: Http) { 
  }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    this.data = this.http.get('./app/data/ac.json').map(res => res.json());
    console.log(this.data);

    // $('#active-training-table').DataTable({
    //   ajax: this.data,
    //   columns: [
    //     { "data": "course_name" },
    //     { "data": "main_trainer" },
    //     { "data": "backup_trainer" },
    //     { "data": "start_date" },
    //     { "data": "end_date" },
    //     { "data": "office" }
    //   ]
    // });
    $('#bcc-schedule-table').DataTable();
  }

}
