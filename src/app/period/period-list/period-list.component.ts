import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';

declare var $:any;
@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.css']
})
export class PeriodListComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'Period',icon:'calendar'},
  ];

  headerData: any = [ 
    {title:'Training Period',subtitle:'Display training period information',icon:'calendar'}
  ];
  
  constructor(private router:Router, private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('#training-period-table').DataTable({
      // 'ajax' : '/data/users',
      // 'serverSide' : true,
      // "searching": false,
      columns : [ {
        data : 'name'
      }, {
        data : 'active'
      }, {
        data : 'courses'
      }, {
        data : 'startDate'
      }, {
        data : 'endDate'
      }, {
        data : 'createdBy'
      }, {
        data : 'updatedBy'
      }, {
        data : 'action',
        orderable : false,
        searchable : false,
        render : function(data, type, row) {
          return row.id ? 'Your id is ' + row.id : '';
        }
      } ]
    });

  }

}
