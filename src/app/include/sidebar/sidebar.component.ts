import { Component, OnInit } from '@angular/core';
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

  constructor(private AuthService: AuthService, private sidebarService: SidebarService) {

    this.AuthService.roleSubs.subscribe(data => {
      this.userRoute=this.sidebarService.getSidebarRoute(data)
    });
  }
  
  ngOnInit() {
    this.userRoute=this.sidebarService.getSidebarRoute(this.AuthService.getActiveRole())
    this.userRoute=this.sidebarService.setActiveSidebar(this.userRoute)

    $('.ui.sidebar').sidebar({
      transition:'overlay',
      silent:true
    }) 
  }

  toggle(){
    $('.ui.sidebar').sidebar('toggle');
  }
}
