import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminRoutes } from '../../_model/sidebarRoute';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userRoute:any;
  constructor(private router: Router) {
    this.userRoute=adminRoutes;
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
