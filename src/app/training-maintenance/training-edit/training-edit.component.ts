import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../_services/header.service';
import { Router } from '@angular/router';
import { TrainingService } from '../../_services/training.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {
  idTraining : any;
  active1:string=''
  active2:string='';
  training:any;

  headerData: any = [ 
    {title:'Training Maintenance - Edit',subtitle:'Edit Training Attendance and Assessment',icon:'edit'}
  ];

  constructor(
              private HeaderService:HeaderService,
              private route:Router,
              private TrainingService: TrainingService) { }

  ngOnInit() {
    this.idTraining = this.route.url.split("/")[4];
    if(this.route.url.match("assessment")){
      this.active1='active';this.active2='';
    } else if(this.route.url.match("attendance")){
      this.active1='';this.active2='active';
    }
    this.route.events.subscribe((event)=>{
      if(this.route.url.match("assessment")){
        this.active1='active';this.active2='';
      } else if(this.route.url.match("attendance")){
        this.active1='';this.active2='active';
      }
    })

    this.HeaderService.setCurrentHeader(this.headerData);

    $('.stackable.tabs.menu .item').tab({
      history:false,
      cache: false
    });

    var that=this

    this.TrainingService.getDetail({id:this.idTraining})
    .subscribe(
      data => {
          if(data.status=='1')
          {
            this.training=data.message
            $('.information').fadeIn('fast')
          }
          else
            this.route.navigate(['/period']);
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
