import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PeriodService } from '../../../_services/period.service';

declare var $:any;
declare var moment:any;
@Component({
  selector: 'app-period-schedule-list',
  templateUrl: './period-schedule-list.component.html',
  styleUrls: ['./period-schedule-list.component.css']
})
export class PeriodScheduleListComponent implements OnInit {
  id:any

  //training class detail
  nameDetail:any;
  trainerDetail:any;
  backupTrainerDetail:any;
  classroomDetail:any;
  locationDetail:any;
  startTimeDetail:any;
  endTimeDetail:any;
  createdByDetail:any;
  createdAtDetail:any;
  updatedByDetail:any;
  updatedAtDetail:any;

  constructor(private ActivatedRoute: ActivatedRoute,private PeriodService:PeriodService) { }

  ngOnInit() {
    var that = this;

    this.ActivatedRoute.params.subscribe(params => {
      this.id=params['id']
    });

    var slTable = $('#schedule-list-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/period_course/list/'+that.id,
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'serverSide' : true,
      'processing' : false,
      "order": [[ 0, "asc" ]],
      "destroy": true,
      "fnInitComplete": function(oSettings, json) {
        //schedule class detail modal
        $('.schedule-list-detail-button').click(function(){
          that.nameDetail=$(this).attr("data-nm")
          that.trainerDetail=$(this).attr("data-tr")
          that.backupTrainerDetail=$(this).attr("data-btr")
          that.classroomDetail=$(this).attr("data-cls")
          that.locationDetail=$(this).attr("data-loc")
          that.startTimeDetail=$(this).attr("data-stm")
          that.endTimeDetail=$(this).attr("data-etm")
          that.createdByDetail=$(this).attr("data-cby")
          that.createdAtDetail=moment(parseInt($(this).attr("data-cat"))).format('YYYY-MM-DD hh:mm:ss')
          that.updatedByDetail=$(this).attr("data-uby")
          that.updatedAtDetail=moment(parseInt($(this).attr("data-uat"))).format('YYYY-MM-DD hh:mm:ss')
          $('.training.class.detail').modal('show');
        })
        $('#close-training-class-detail').click(function(){
          $('.training.class.detail').modal('hide');
        })
      },
      'autoWidth': false,
      'columnDefs' : [
        {"className":"center aligned","targets":[-1]},
      ],
      columns : [ {
        data : 'course.courseName' //course name
      }, {
        data : 'trainerMain.name' //main trainer
      }, {
        data : 'trainerBackup', //backup trainer
        render : function(data, type, row) {
          if(data==null){
            return `-`;
          } else {
            return row.trainerBackup.name;
          }
        } 
      }, {
        data : 'classRoom.className' //classroom
      }, {
        data : 'startTime' //start time
      }, {
        data : 'endTime' //end time
      }, {
        data : 'capacity' //capacity
      }, {
        data : 'enrolledUser', //all participant list
        render : function(data, type, row) {
          return `<a class="item">`+data.length+`</a>`;
        } 
      }, {
        data : 'anothercolumn',
        orderable : false,
        searchable : false,
        render : function(data, type, row) {
          if(row.trainerBackup==null){
            return `<div data-tooltip="Details" data-position="top center"><i class="blue info icon schedule-list-detail-button" data-nm="${row.course.courseName}" data-tr="${row.trainerMain.name}" data-btr="-" data-cls="${row.classRoom.className}" data-loc="${row.classRoom.location}" data-stm="${row.startTime}" data-etm="${row.endTime}" data-cby="${row.createdBy}" data-cat="${row.createdDate}" data-uby="${row.updatedBy}" data-uat="${row.updatedDate}" style="cursor:pointer"></i></div>
            <div data-tooltip="Enroll Participants" data-position="top center"><i class="teal users icon" id="deleteButton" data-id="${row.idPeriodCourse}" style="cursor:pointer"></i></div>`;
          } else{
            return `<div data-tooltip="Details" data-position="top center"><i class="blue info icon schedule-list-detail-button" data-nm="${row.course.courseName}" data-tr="${row.trainerMain.name}" data-btr="${row.trainerBackup.name}" data-cls="${row.classRoom.className}" data-loc="${row.classRoom.location}" data-stm="${row.startTime}" data-etm="${row.endTime}" data-cby="${row.createdBy}" data-cat="${row.createdDate}" data-uby="${row.updatedBy}" data-uat="${row.updatedDate}" style="cursor:pointer"></i></div>
            <div data-tooltip="Enroll Participants" data-position="top center"><i class="teal users icon" id="deleteButton" data-id="${row.idPeriodCourse}" style="cursor:pointer"></i></div>`;
          }
        }
      } ]
    });

    $('#enroll-participants-table').DataTable();

    $('#add-schedule-button').click(function(){
      $('.small.modal.add.schedule').modal('show');
      $('#start-date-add-schedule').calendar({
        type: 'datetime'
      });
  
      $('#end-date-add-schedule').calendar({
        type: 'datetime'
      });
    })

    

    // $('#schedule-list-detail-button').click(function(){
    //   alert("e")
    //   $('.training.class.detail').modal('show');
    // })

    $('#enroll-participants-button').click(function(){
      $('.small.modal.enroll.participants').modal('show');
    })

    $('#course-name-add-schedule').dropdown();
    $('#course-type-add-schedule').dropdown();
    $('#class-room-add-schedule').dropdown();
    $('#trainer-add-schedule').dropdown();
    $('#backup-trainer-add-schedule').dropdown();
  }

}
