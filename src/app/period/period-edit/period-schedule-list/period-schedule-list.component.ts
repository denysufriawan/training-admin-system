import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PeriodService } from '../../../_services/period.service';
import { DropdownService } from '../../../_services/dropdown.service';
import { AuthService } from '../../../_services/auth.service';

declare var $:any;
declare var moment:any;
declare var swal:any;

@Component({
  selector: 'app-period-schedule-list',
  templateUrl: './period-schedule-list.component.html',
  styleUrls: ['./period-schedule-list.component.css']
})
export class PeriodScheduleListComponent implements OnInit {
  id:any
  startDate:any;
  endDate:any;

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

  //add schedule
  courseDrop=[];
  classDrop=[];
  trainerDrop=[];

  constructor(private ActivatedRoute: ActivatedRoute,private PeriodService:PeriodService,private router:Router,private DropdownService:DropdownService, private AuthService:AuthService) { }

  ngOnInit() {
    var that = this;

    this.ActivatedRoute.params.subscribe(params => {
      this.id=params['id']
    });

    var aeplTable

    //schedule list
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

        //enroll
        $('.small.modal.enroll.participants')
        .modal({
          onShow: function() {
            $('.small.modal.enroll.participants').modal('refresh');
            $("#checkAll").prop('checked', false);
            $('#add-eligible-participant-table').DataTable().rows().deselect();
            
            var eplTable = $('#eligible-participant-list-table').on( 'processing.dt', function ( e, settings, processing ) {
              if(processing)
                $('#loading').fadeIn('fast');
              else
                $('#loading').fadeOut('fast');
            }).DataTable({
              'ajax' : {
                'url': 'http://localhost:8080/api/eligible/list/'+that.id,
                'contentType': 'application/json',
                'type': 'POST',
                'data': function(d) {
                  return JSON.stringify(d);
                }
              },
              'serverSide' : true,
              'processing' : false,
              "destroy": true,
              "fnInitComplete": function(oSettings, json) {
                $('.small.modal.enroll.participants').modal('refresh');
                //select all process
                $('#checkAll').change(function() {
                    if (this.checked) {
                        $('#add-eligible-participant-table').DataTable().rows().select();
                        // $("th.select-checkbox").removeClass("selected");
                    } else {
                        $('#add-eligible-participant-table').DataTable().rows().deselect();
                        // $("th.select-checkbox").addClass("selected");
                    }
                })
        
        
              },
              'columnDefs' : [
                {"className":"center aligned","targets":[-1]},
                {
                  searchable: false,
                  orderable: false,
                  className: 'select-checkbox',
                  targets:   0,
                  'checkboxes': {
                    'selectRow': true
                 }
                }
              ],
              select: {
                style: 'multi', selector: 'td:first-child'
              },
              columns : [ {
                data : 'name',
                orderable : false,
                searchable : false,
                render : function(data, type, row) {
                  return ``;
                }
              }, {
                data : 'name'
              }, {
                data : 'anothercolumn',
                orderable : false,
                searchable : false,
                render : function(data, type, row) {
                  return `
                  <div data-tooltip="Enroll" data-position="top center"><i class="sign out red icon" id="enrollButton" data-id="${row.idUser}" data-idperiod="${that.id}" data-name="${row.name}" style="cursor:pointer"></i></div>`;
                }
              } ]
            });
          },
          onHide: function(){
            aeplTable.destroy();
          },
          closable: false,
          autofocus: false
        })
        .modal('attach events', '#enroll-participants-button');

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
            <div data-tooltip="Enroll Participants" data-position="top center"><i class="teal users icon" id="enroll-participants-button" data-id="${row.idPeriodCourse}" style="cursor:pointer"></i></div>`;
          } else{
            return `<div data-tooltip="Details" data-position="top center"><i class="blue info icon schedule-list-detail-button" data-nm="${row.course.courseName}" data-tr="${row.trainerMain.name}" data-btr="${row.trainerBackup.name}" data-cls="${row.classRoom.className}" data-loc="${row.classRoom.location}" data-stm="${row.startTime}" data-etm="${row.endTime}" data-cby="${row.createdBy}" data-cat="${row.createdDate}" data-uby="${row.updatedBy}" data-uat="${row.updatedDate}" style="cursor:pointer"></i></div>
            <div data-tooltip="Enroll Participants" data-position="top center"><i class="teal users icon" id="enroll-participants-button" data-id="${row.idPeriodCourse}" style="cursor:pointer"></i></div>`;
          }
        }
      } ]
    });


    //add schedule
    this.PeriodService.edit({id:this.id})
    .subscribe(
      data => {
          this.startDate = data.message.startDate;
          this.endDate = data.message.endDate;
    });

    $('.small.modal.add.schedule')
    .modal({
      onShow: function() {
        var startPeriod = new Date(that.startDate);
        var endPeriod =  new Date(that.endDate);
        $('#start-date-add-schedule').calendar({
          type: 'datetime',
          minDate: new Date(startPeriod.getFullYear(), startPeriod.getMonth(), startPeriod.getDate()),
          maxDate: new Date(endPeriod.getFullYear(), endPeriod.getMonth(), endPeriod.getDate()),
          endCalendar: $('#end-date-add-schedule'),
          ampm: false,  
          formatter: {
            date: function (date, settings) {
              if (!date) return '';
              var day = date.getDate();
              var month = date.getMonth() + 1;
              var year = date.getFullYear();
              var hour = date.getHours();
              var minute = date.getMinutes();
              var second = date.getSeconds();
              return year + '-' + month + '-' + day ;
            }
          }
        });
    
        $('#end-date-add-schedule').calendar({
          type: 'datetime',
          minDate: new Date(startPeriod.getFullYear(), startPeriod.getMonth(), startPeriod.getDate()),
          maxDate: new Date(endPeriod.getFullYear(), endPeriod.getMonth(), endPeriod.getDate()),
          startCalendar: $('#start-date-add-schedule'),
          ampm: false,  
          formatter: {
            date: function (date, settings) {
              if (!date) return '';
              var day = date.getDate();
              var month = date.getMonth() + 1;
              var year = date.getFullYear();
              var hour = date.getHours();
              var minute = date.getMinutes();
              var second = date.getSeconds();
              return year + '-' + month + '-' + day ;
            }
          }
        });
      },
      onHide: function(){
      },
      closable: false,
      autofocus: false
    })
    .modal('attach events', '#add-schedule-button');

    $('#course-name-add-schedule').dropdown();
    $('#schedule-type-add-schedule').dropdown();
    $('#class-room-add-schedule').dropdown();
    $('#main-trainer-add-schedule').dropdown();
    $('#backup-trainer-add-schedule').dropdown();

    this.DropdownService.getCourse()
    .subscribe(
      data => {
          this.courseDrop=data.message
    });

    this.DropdownService.getClass()
    .subscribe(
      data => {
          this.classDrop=data.message
    });

    this.DropdownService.getTrainer()
    .subscribe(
      data => {
          this.trainerDrop=data.message
    });

    $('.ui.form.addSchedule')
      .form({
        inline:true,
        on:'blur',
        fields: {
          courseName: {
            identifier: 'courseName',
            rules: [
              {
                type   : 'empty'
              }
            ]
          }
        },onSuccess:(event,fields) => {
          event.preventDefault();
          fields.createdBy = this.AuthService.getUser().name;
          fields.updatedBy = this.AuthService.getUser().name;
          fields.startTime = moment(fields.startTime).format('YYYY-MM-DD hh:mm:ss')
          fields.endTime = moment(fields.endTime).format('YYYY-MM-DD hh:mm:ss')
          fields.startCourseDate = moment(fields.startTime).format('YYYY-MM-DD')
          fields.endCourseDate = moment(fields.endTime).format('YYYY-MM-DD')
          this.addSchedule(fields);
        }
    });

    //enroll participants
    //save enroll process
    $("#save-enroll").click(function(){
      var ids = $.map($('#eligible-participant-list-table').DataTable().rows('.selected').data(), function (item) {
          return item.idUser;
      });
      
      $('#loading-modal').fadeIn('fast')
      that.PeriodService.enroll_user({data:ids.join(),id:that.id})
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
                      $('#loading-modal').fadeOut('fast')
                      $('.add.eligible.participant').modal('hide');
                      $('#eligible-participant-list-table').DataTable().ajax.reload(null,false);
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
                      $('#loading-modal').fadeOut('fast')
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
                  $('#loading-modal').fadeOut('fast')
            });
          });
    })

  }

  addSchedule(form) {
    var that=this;
    $('#loading').fadeIn('fast')
    this.PeriodService.add_schedule(form)
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
                    $('.small.modal.add.schedule').modal('hide')
                    $('#schedule-list-table').DataTable().ajax.reload()
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
  }

}
