import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodAddComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
      $('#start-date-add-period').calendar({
        type: 'date'
      });

      $('#end-date-add-period').calendar({
        type: 'date'
      });
  }
}
