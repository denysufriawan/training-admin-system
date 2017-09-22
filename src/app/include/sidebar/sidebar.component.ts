import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminRoutes, trainerRoutes, managerRoutes, participantsRoutes } from '../../_classes/sidebarRoute';
import { AuthService } from '../../_services/auth.service';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: String;
  userRoute:any=[];

  constructor(private router: Router, private AuthService: AuthService) {

    this.AuthService.roleSubs.subscribe(data => {
      this.role = data;
      if(this.role=="1"){
        this.userRoute=adminRoutes;
      } else if (this.role=="2") {
        this.userRoute=trainerRoutes;
      } else if (this.role=="3") {
        this.userRoute=managerRoutes;
      } else if (this.role=="4") {
        this.userRoute=participantsRoutes;
      }
    });
  }
  
  ngOnInit() {
    $('.ui.sidebar').sidebar({
      transition:'overlay',
      silent:true
    }) 

    this.router.events.subscribe((event)=>{
      if(!this.router.url.match('/login'))
      {
        this.userRoute.forEach(element => {
          if(this.router.url.match(element.path)) {
            element.class='active';
          } else {
            element.class='';
          }
        });
      }
    })
  }

  toggle(){
    $('.ui.sidebar').sidebar('toggle');
  }
}
