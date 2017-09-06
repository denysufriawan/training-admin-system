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

  path:any
  route:any[]
  constructor(private router: Router) {
    this.path = this.router.url
    this.route=adminRoutes
  }

  ngOnInit() {
      this.route.forEach(element => {
        if(this.path==element.path)
          element.class='active'
        else
          element.class=''
      });
  }

}
