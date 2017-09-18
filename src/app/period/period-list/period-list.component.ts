import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.css']
})
export class PeriodListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    $('#training-period-table').DataTable();

    $('#delete-period-button').click(function(){
      $('.ui.basic.modal.delete.period').modal('show');
    })
  }

  editPeriodBtn = function () {
    this.router.navigateByUrl('/period/edit');
  };

}
