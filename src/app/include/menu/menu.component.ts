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
  current_user:any;
  constructor(private router: Router,private authService:AuthService,private menuhService:MenuService) {
    this.authService.userSubs.subscribe(data => {
      this.current_user=JSON.parse(data);
      this.menuhService.setRoleDropdown(this.current_user);
    });
  }

  ngOnInit() {
    console.log(JSON.stringify({
      user:{
          username:"denysufriawan",
          email:"deny.sufriawan@mitrais.com",
          role:[
              {idRole:"1",roleName:"Administrator"},
              {idRole:"2",roleName:"Trainer"},
              {idRole:"3",roleName:"Manajer"},
              {idRole:"4",roleName:"Participant"}
          ]
      },
      activeRole:"1"
  }))
    $('#account-dropdown').dropdown();

    this.current_user=this.authService.getUser();
    this.menuhService.setRoleDropdown(this.current_user);

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
