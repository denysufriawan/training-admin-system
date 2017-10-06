import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TrainingService } from '../../../_services/training.service';
import { BreadcrumbService } from '../../../_services/breadcrumb.service';
import { DropdownService } from '../../../_services/dropdown.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-attendance-edit',
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css']
})
export class AttendanceEditComponent implements OnInit {
  id:any;
  idSchedule:any;
  breadcrumbData:any;
  absenceDrop:any=[]
  constructor(private BreadcrumbService:BreadcrumbService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private TrainingService: TrainingService,
    private DropdownService: DropdownService) {
      this.ActivatedRoute.params.subscribe(params => {
        this.id=params['id']
        this.idSchedule=params['id2']
        this.breadcrumbData = [
          {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
          {link:'/training',title:'Training Maintenance',icon:'desktop'},
          {link:'/training/edit/attendance/'+this.id,title:'Attendance',icon:'checked calendar'},
          {link:'',title:'edit',icon:'edit'}
        ];
      });
    }

  ngOnInit() {
    var that = this;
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);

    this.DropdownService.getAbsence()
    .subscribe(
      data => {
        this.absenceDrop=data.message
    });

    var table = $('#attendance-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'fnInitComplete':function(){
        $('.dataTables_filter').fadeIn('fast')
        $('.pass').dropdown()
      },
      'ordering':false,
      'paging':false,
      'ajax' : {
        'url': 'http://localhost:8080/api/attendance-user/list/'+that.idSchedule,
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'processing' : false,
      'columnDefs' : [
        {"className":"center aligned","targets":[-1],"width":"5%"}
      ],
      columns : [ {
        data : 'userCourse.user.name',
        render : function(data, type, row) {
          return `${data}<input type="hidden" name="idAttendance[]" value="${row.idAttendance}">`;
        }
      }, {
        data : 'anothercolumn',
        searchable:false,
        render : function(data, type, row) {
          var option='';
          that.absenceDrop.forEach(element => {
            if(row.absence.idAbsence==element.idAbsence)
              option+=`<option value="${element.idAbsence}" selected>${element.absenceName}</option>`
            else
              option+=`<option value="${element.idAbsence}">${element.absenceName}</option>`
          });
          return `
          <select class="ui pass dropdown" name="idAbsence[]" id="absence${row.idAttendance}">
          <option value="">-- Absence --</option>
          ${option}
          </select>`;
        }
      } ]
    });

    $('.editAttendance')
    .submit(function(){
      $('#loading').fadeIn('fast')
      var idAttendance = $("input[name='idAttendance[]']")
      .map(function(){return $(this).val();}).get();
      var idAbsence = $("select[name='idAbsence[]']")
      .map(function(){return $(this).val();}).get();
      that.TrainingService.editAttendance({idAttendanceInput:idAttendance,idAbsenceInput:idAbsence})
        .subscribe(
          data => {
              if(data.status=='1')
              {
                swal({
                  type: 'success',
                  title: 'Success!',
                  text: data.message,
                  showCancelButton: false,
                  confirmButtonText: "OK"
                }).then(
                    function(){
                      $('#loading').fadeOut('fast')
                      that.router.navigate(['/training/edit/attendance',that.id])
                });
              }
              else
              {
                swal({
                  type: 'error',
                  title: 'Error!',
                  text: data.message,
                  showCancelButton: false,
                  confirmButtonText: "OK"
                }).then(
                    function(){
                      $('#loading').fadeOut('fast')
                });
              }
          },
          error => {
            swal({
                  type: 'error',
                  title: 'Error!',
                  text: "Oops, the server can not be reached!",
                  showCancelButton: false,
                  confirmButtonText: "OK"
              }).then(
                  function(){
                    $('#loading').fadeOut('fast')
              });
      });
    });
  }

}
