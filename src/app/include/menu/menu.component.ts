import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { MenuService } from '../../_services/menu.service';

declare var $:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  current_role:any[];
  current_user:any;
  constructor(private router: Router,private authService:AuthService,private menuhService:MenuService) {
    this.current_user=this.authService.getUser();

    this.authService.userSubs.subscribe(data => {
      this.current_user=this.authService.getUser();
      this.menuhService.setRoleDropdown();
    });
  }

  ngOnInit() {
    $('#account-dropdown').dropdown();
    
    this.menuhService.setRoleDropdown();

    this.router.events.subscribe((event)=>{
      if(this.router.url.match('/login'))
        $('.top.menu').addClass('hide')
      else
        $('.top.menu').removeClass('hide')
    })
  }

  toggle(){
    $('.ui.sidebar').sidebar('toggle');
  }

  logOut(){
    this.authService.logout();
  }
}
