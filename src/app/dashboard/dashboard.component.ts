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
  data:any;

  breadcrumbData: any = [
    {link:'',title:'Dashboard',icon:'dashboard'}
  ];

  headerData: any = [ 
    {title:'Dashboard',subtitle:'Display training course schedule information',icon:'dashboard'}
  ];

  constructor(private BreadcrumbService:BreadcrumbService,
              private Router:Router,
              private HeaderService:HeaderService) { 
  }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);
    var that = this;
    
    var table = $('#active-training-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/dashboard/active',
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      "scrollY": "200px",
      "scrollCollapse": true,
      "paging": false,
      'processing' : false,
      "order": [[ 0, "asc" ]],
      "fnInitComplete": function(oSettings, json) {

      },
      'columnDefs' : [
        {"className":"center aligned","targets":[-1]},
      ],
      columns : [ 
      {
        data : 'period.periodName'
      },
      {
        data : 'course.courseName'
      },
      {
        data : 'trainerMain.name'
      },
      {
        data : 'startTime'
      },
      {
        data : 'endTime'
      },
      {
        data : 'classRoom.location'
      } ]
    });

    var tableBCC = $('#bcc-schedule-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading2').fadeIn('fast');
      else
        $('#loading2').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/dashboard/bcc',
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      "scrollY": "200px",
      "scrollCollapse": true,
      "paging": false,
      'processing' : false,
      "order": [[ 0, "asc" ]],
      "fnInitComplete": function(oSettings, json) {

      },
      'columnDefs' : [
        {"className":"center aligned","targets":[-1]},
      ],
      columns : [ 
      {
        data : 'period.periodName'
      },
      {
        data : 'course.courseName'
      },
      {
        data : 'trainerMain.name'
      },
      {
        data : 'startTime'
      },
      {
        data : 'classRoom.location'
      } ]
    });
  }

}
