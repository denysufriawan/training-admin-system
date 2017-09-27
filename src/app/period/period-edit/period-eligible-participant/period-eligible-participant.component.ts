import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-period-eligible-participant',
  templateUrl: './period-eligible-participant.component.html',
  styleUrls: ['./period-eligible-participant.component.css']
})
export class PeriodEligibleParticipantComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('#eligible-participant-list-table').DataTable();
    $('#add-eligible-participant-table').DataTable();
    $('#add-eligible-participant-button').click(function(){
      $('.large.modal.add.eligible.participant').modal('show');
    })

    $('#delete-ep-user').click(function(){
      $('.ui.basic.modal.delete.ep.user').modal('show');
    })

  }

}
