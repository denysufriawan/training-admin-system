import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.css']
})
export class PeriodEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.stackable.tabs.menu .item').tab({
      history:false,
      cache: false
    });
  ;
  }

}
