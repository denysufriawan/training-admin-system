import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../_services/breadcrumb.service';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'Enrollment',icon:'file text outline'},
  ];

  headerData: any = [ 
    {title:'Enrollment',subtitle:'Display the enrolled training of user',icon:'file text outline'}
  ];

  constructor(private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);
  }

}
