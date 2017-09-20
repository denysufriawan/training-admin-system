import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.css']
})
export class PeriodEditComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/period',title:'Period',icon:'calendar'},
    {link:'',title:'Edit',icon:'edit'}
  ];

  headerData: any = [ 
    {title:'Training Period - Edit',subtitle:'Edit period, eligible participant, and schedule',icon:'edit'}
  ];

  constructor(private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('.stackable.tabs.menu .item').tab({
      history:false,
      cache: false
    });

    $('#eligible-participant-list-table').DataTable();
    $('#add-eligible-participant-table').DataTable();
    $('#schedule-list-table').DataTable();
    $('#enroll-participants-table').DataTable();

    $('#course-name-add-schedule').dropdown();
    $('#course-type-add-schedule').dropdown();
    $('#class-room-add-schedule').dropdown();
    $('#trainer-add-schedule').dropdown();
    $('#backup-trainer-add-schedule').dropdown();

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

  }

}
