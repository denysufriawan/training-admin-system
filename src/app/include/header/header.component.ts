import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../_services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData:any;

  constructor(private HeaderService:HeaderService) { 
    this.HeaderService.headerSubs.subscribe(data => {
      this.headerData = data;
    });
  }

  ngOnInit() {
  }

}
