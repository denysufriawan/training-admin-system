import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminRoutes, trainerRoutes, managerRoutes, participantsRoutes } from '../../_classes/sidebarRoute';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: String;
  userRoute:any;

  constructor(private router: Router) {
    this.role = localStorage.getItem('role');
    if(this.role=="Admin"){
      this.userRoute=adminRoutes;
    } else if (this.role=="Trainer") {
      this.userRoute=trainerRoutes;
    } else if (this.role=="Manager") {
      this.userRoute=managerRoutes;
    } else if (this.role=="Participants") {
      this.userRoute=participantsRoutes;
    } else {
      this.userRoute=adminRoutes;
    }
  }
  
  ngOnInit() {
    $('.ui.sidebar').sidebar('setting', 'transition', 'overlay')
    this.router.events.subscribe((event)=>{
        this.userRoute.forEach(element => {
        if(this.router.url.match(element.path)) {
          element.class='active';
        } else {
          element.class='';
        }
      });
    })
  }

  toggle(){
    $('.ui.sidebar').sidebar('toggle');
  }
}
