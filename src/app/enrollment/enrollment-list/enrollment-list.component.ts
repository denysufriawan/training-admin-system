import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { AuthService } from '../../_services/auth.service';

declare var $:any;
@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'Enrollment',icon:'file text outline'},
  ];

  headerData: any
  constructor(private router:Router,
              private BreadcrumbService:BreadcrumbService,
              private HeaderService:HeaderService,
              private AuthService: AuthService) {
    this.headerData = [ 
      {title:'Enrollment List - '+this.AuthService.getUser().name,subtitle:'Display enrolled training for current user',icon:'file text outline'}
    ];
  }

  ngOnInit() {
    $("#refresh").click(function(){
      table.ajax.reload();
    })
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);
    var that=this;

    var table = $('#enroll-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/enrollment/list/'+that.AuthService.getUserId(),
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'responsive': true,
      'serverSide' : true,
      'processing' : false,
      "order": [[ 0, "asc" ]],
      'columnDefs' : [
        {"className":"center aligned","targets":[-1]}
      ],
      columns : [ 
      {
        data : 'periodCourse.period.periodName'
      },
      {
        data : 'periodCourse.course.courseName'
      },
      {
        data : 'periodCourse.trainerMain.name'
      },
      {
        data : 'periodCourse.startTime'
      },
      {
        data : 'periodCourse.endTime'
      },
      {
        data : 'userStatus'
      }]
    });
  }

}
