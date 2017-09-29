import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../include/sidebar/sidebar.component';
import { BreadcrumbService } from '../_services/breadcrumb.service';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-training-maintenance',
  templateUrl: './training-maintenance.component.html',
  styleUrls: ['./training-maintenance.component.css']
})
export class TrainingMaintenanceComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'Training Maintenance',icon:'desktop'},
  ];

  headerData: any = [ 
    {title:'Training Maintenance',subtitle:'Manage the attendance and the assessment of the training',icon:'desktop'}
  ];

  constructor(private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);
  }

}
