import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';

declare var $:any;
@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/period',title:'Period',icon:'calendar'},
    {link:'',title:'Create',icon:'plus'}
  ];

  headerData: any = [ 
    {title:'Training Period - Create',subtitle:'Create new training period',icon:'plus'}
  ];

  constructor(private router: Router, private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('#start-date-add-period').calendar({
      type: 'date'
    });

    $('#end-date-add-period').calendar({
      type: 'date'
    });
  }
}
