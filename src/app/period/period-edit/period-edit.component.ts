import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { Router } from '@angular/router';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.css']
})
export class PeriodEditComponent implements OnInit {
  idPeriod : any;
  active1:string=''
  active2:string=''
  active3:string=''

  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/period',title:'Period',icon:'calendar'},
    {link:'',title:'Edit',icon:'edit'}
  ];

  headerData: any = [ 
    {title:'Training Period - Edit',subtitle:'Edit period, eligible participant, and schedule list',icon:'edit'}
  ];

  constructor(private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService, private route:Router ) { }

  ngOnInit() {

    this.idPeriod = this.route.url.split("/")[4];
    if(this.route.url.match("edit-data")){
      this.active1='active';this.active2='';this.active3=''
    } else if(this.route.url.match("eligible-participant")){
      this.active1='';this.active2='active';this.active3=''
    } else if(this.route.url.match("schedule-list")){
      this.active1='';this.active2='';this.active3='active'
    }
    this.route.events.subscribe((event)=>{
      if(this.route.url.match("edit-data")){
        this.active1='active';this.active2='';this.active3=''
      } else if(this.route.url.match("eligible-participant")){
        this.active1='';this.active2='active';this.active3=''
      } else if(this.route.url.match("schedule-list")){
        this.active1='';this.active2='';this.active3='active'
      }
    })

    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('.stackable.tabs.menu .item').tab({
      history:false,
      cache: false
    });
  }

}
