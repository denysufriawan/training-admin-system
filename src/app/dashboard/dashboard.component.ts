import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../_services/breadcrumb.service';
import { HeaderService } from '../_services/header.service';

declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  breadcrumbData: any = [
    {link:'',title:'Dashboard',icon:'dashboard'}
  ];

  headerData: any = [ 
    {title:'Dashboard',subtitle:'Display training course schedule information',icon:'dashboard'}
  ];

  constructor(private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('#active-training-table').DataTable();
    $('#bcc-schedule-table').DataTable();
  }

}
