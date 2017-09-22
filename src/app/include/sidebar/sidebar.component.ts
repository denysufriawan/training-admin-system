import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SidebarService } from '../../_services/sidebar.service';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRoute:any=[];

  constructor(private router: Router, private AuthService: AuthService, private sidebarService: SidebarService) {

    this.AuthService.roleSubs.subscribe(data => {
      this.userRoute=this.sidebarService.getSidebarRoute(data)
    });
  }
  
  ngOnInit() {
    this.userRoute=this.sidebarService.getSidebarRoute(this.AuthService.getActiveRole())
    
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
