import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../_services/breadcrumb.service';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'Achievement',icon:'trophy'},
  ];

  headerData: any = [ 
    {title:'Achievement',subtitle:'Mantain and display the participant achievement of english placement test result',icon:'trophy'}
  ];
  constructor(private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);
  }

}
