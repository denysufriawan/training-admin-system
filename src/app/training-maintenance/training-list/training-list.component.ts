import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { AuthService } from '../../_services/auth.service';
declare var $:any;
@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'Training Maintenance',icon:'desktop'},
  ];

  headerData: any = [ 
    {title:'Training Maintenance',subtitle:'Manage the attendance and the assessment of the training',icon:'desktop'}
  ];
  constructor(private router:Router,
              private BreadcrumbService:BreadcrumbService,
              private HeaderService:HeaderService,
              private AuthService: AuthService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);
    var that = this;

    var table = $('#training-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/training/list/'+this.AuthService.getUserId()+'/'+this.AuthService.getActiveRole(),
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'serverSide' : true,
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
        data : 'scheduleType'
      },
      {
        data : 'startTime'
      },
      {
        data : 'endTime'
      },
      {
        data : 'classRoom.className'
      },
      {
        data : 'enrolledUser',
        orderable:false,
        render : function(data, type, row) {
          return data.length;
        }
      },
      {
        data : 'anothercolumn',
        orderable : false,
        searchable : false,
        render : function(data, type, row) {
          return `
          <div data-tooltip="Edit" data-position="top center"><i class="purple edit icon" id="editButton" data-id="${row.idPeriodCourse}" style="cursor:pointer"></i></div>`;
        }
      } ]
    });

    $("#refresh").click(function(){
      table.ajax.reload();
    })
    
    $(document).on('click', '#editButton', function(event) {
      that.router.navigate(['/training/edit/assessment',$(this).data('id')])
    });
  }

}
