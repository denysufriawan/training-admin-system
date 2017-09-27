import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-period-schedule-list',
  templateUrl: './period-schedule-list.component.html',
  styleUrls: ['./period-schedule-list.component.css']
})
export class PeriodScheduleListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#schedule-list-table').DataTable();
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

    $('#schedule-list-detail-button').click(function(){
      $('.small.modal.training.class.detail').modal('show');
    })

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
