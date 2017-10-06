import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TrainingService } from '../../../_services/training.service';
import { BreadcrumbService } from '../../../_services/breadcrumb.service';
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  id:any;
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/training',title:'Training Maintenance',icon:'desktop'},
    {link:'',title:'Attendance',icon:'checked calendar'}
  ];
  constructor(private BreadcrumbService:BreadcrumbService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private TrainingService: TrainingService) { }

  ngOnInit() {
    var that = this;
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.ActivatedRoute.params.subscribe(params => {
      this.id=params['id']
    });

    var table = $('#attendance-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'fnInitComplete':function(){
        $('.dataTables_filter').fadeIn('fast')
      },
      'ordering':false,
      'paging':false,
      'ajax' : {
        'url': 'http://localhost:8080/api/attendance/list/'+that.id,
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'processing' : false,
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
        data : 'courseDate'
      },
      {
        data : 'anothercolumn',
        searchable:false,
        render : function(data, type, row) {
          return `
          <div data-tooltip="Edit Attendance" data-position="top center"><i class="green checked calendar icon" id="editButton" data-id="${row.idCourseSchedule}" style="cursor:pointer"></i></div>`;
        }
      } ]
    });

    $(document).on('click', '#editButton', function(event) {
      that.router.navigate(['/training/edit/attendance-edit',that.id,$(this).data('id')])
    });
  }

}
