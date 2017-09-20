import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  current_active_role: String;
  constructor(private router: Router) { }

  ngOnInit() {
    $('#account-dropdown').dropdown();
    $('#role-dropdown').dropdown();
    this.router.events.subscribe((event)=>{
      if(this.router.url.includes("login"))
        $('.top.menu').addClass('hide')
      else
        $('.top.menu').removeClass('hide')
    })

    this.current_active_role = localStorage.getItem('role');
  }

  toggle(){
    $('.ui.sidebar').sidebar('toggle');
  }

  setAdminRole(){
    localStorage.setItem('role', 'Admin');
    window.location.reload();
  }

  setTrainerRole(){
    localStorage.setItem('role', 'Trainer');
    window.location.reload();
  }

  setManagerRole(){
    localStorage.setItem('role', 'Manager');
    window.location.reload();
  }

  setParticipantsRole(){
    localStorage.setItem('role', 'Participants');
    window.location.reload();
  }

  doLogout(){
    localStorage.clear();
  }
}
