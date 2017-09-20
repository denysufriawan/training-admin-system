import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../_services/breadcrumb.service';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbData:any;

  constructor(private BreadcrumbService:BreadcrumbService) {
    this.BreadcrumbService.breadcrumbSubs.subscribe(data => {
      this.breadcrumbData = data;
    });
   }

  ngOnInit() {
    
  }

}
