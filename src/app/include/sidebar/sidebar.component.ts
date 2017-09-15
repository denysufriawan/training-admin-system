import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminRoutes } from '../../class/sidebarRoute';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  route:any;
  constructor(private router: Router) {
    this.route=adminRoutes;
  }
  
  ngOnInit() {
      this.router.events.subscribe((event)=>{
          this.route.forEach(element => { 
          
          if(this.router.url.replace("/spiderman","").match(element.path.replace("/spiderman",""))) {
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
