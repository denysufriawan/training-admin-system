import { Component, OnInit } from '@angular/core';
import { adminRoutes } from '../../class/sidebarRoute';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  path:any
  route:any[]
  constructor() {
    this.route=adminRoutes
  }

  ngOnInit() {
      // this.route.forEach(element => {
        
      //   if(this.path.replace("/spiderman","").match(element.path.replace("/spiderman","")))
      //     element.class='active'
      //   else
      //     element.class=''
      // });
  }

}
