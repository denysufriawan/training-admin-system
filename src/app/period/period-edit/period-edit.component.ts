import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.css']
})
export class PeriodEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.stackable.tabs.menu .item').tab({
      history:false,
      cache: false
    });

    $('#eligible-participant-list-table').DataTable();
    $('#add-eligible-participant-table').DataTable();
    $('#schedule-list-table').DataTable();

    $('#start-date-edit-period').calendar({
      type: 'date'
    });

    $('#end-date-edit-period').calendar({
      type: 'date'
    });
    
    $('#delete-ep-user').click(function(){
      $('.ui.basic.modal.delete.ep.user').modal('show');
    })

    $('#add-eligible-participant-button').click(function(){
      $('.large.modal.add.eligible.participant').modal('show');
    })

    $('#schedule-list-detail-button').click(function(){
      $('.small.modal.training.class.detail').modal('show');
    })

    $('#enroll-participants-button').click(function(){
      $('.small.modal.enroll.participants').modal('show');
    })

  }

}
