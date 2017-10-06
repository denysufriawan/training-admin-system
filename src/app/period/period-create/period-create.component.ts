import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { PeriodService } from '../../_services/period.service';
import { AuthService } from '../../_services/auth.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/period',title:'Period',icon:'calendar'},
    {link:'',title:'Create',icon:'plus'}
  ];

  headerData: any = [ 
    {title:'Training Period - Create',subtitle:'Create new training period',icon:'plus'}
  ];

  constructor(private router: Router, private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService, private PeriodService:PeriodService, private AuthService: AuthService) { }

  ngOnInit() {   
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('#start-date-add-period').calendar({
      type: 'date',
      endCalendar: $('#end-date-add-period'),
      formatter: {
        date: function (date, settings) {
          if (!date) return '';
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          return year + '-' + month + '-' + day;
        }
      }
    });

    $('#end-date-add-period').calendar({
      type: 'date',
      startCalendar: $('#start-date-add-period'),
      formatter: {
        date: function (date, settings) {
          if (!date) return '';
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          return year + '-' + month + '-' + day;
        }
      }
    });

    $('.ui.form.createPeriod')
    .form({
      inline:true,
      on:'blur',
      fields: {
        periodName: {
          identifier: 'periodName',
          rules: [
            {
              type   : 'empty'
            },
            {
              type   : 'maxLength[50]'
            }
          ]
        },
        startDate: {
          identifier: 'startDate',
          rules: [
            {
              type   : 'empty'
            }
          ]
        },
        endDate: {
          identifier: 'endDate',
          rules: [
            {
              type   : 'empty'
            }
          ]
        }
      },onSuccess:(event,fields) => {
        event.preventDefault();
        fields.createdBy = this.AuthService.getUser().name;
        fields.updatedBy = this.AuthService.getUser().name;
        this.createPeriod(fields);
      }
    });
  }

  createPeriod(form) {
    var that=this;
    $('#loading').fadeIn('fast')
    this.PeriodService.create(form)
      .subscribe(
        data => {
            if(data.status=='1')
            {
              swal({
                type: 'success',
                title: 'Success!',
                text: data.message,
                showCancelButton: false,
                confirmButtonText: "OK"
              }).then(
                  function(){
                    $('#loading').fadeOut('fast')
                    that.router.navigate(['/period']);
              });
            }
            else
            {
              swal({
                type: 'error',
                title: 'Error!',
                text: data.message,
                showCancelButton: false,
                confirmButtonText: "OK"
              }).then(
                  function(){
                    $('#loading').fadeOut('fast')
              });
            }
        },
        error => {
          swal({
                type: 'error',
                title: 'Error!',
                text: "Oops, the server can not be reached!",
                showCancelButton: false,
                confirmButtonText: "OK"
            }).then(
                function(){
                  $('#loading').fadeOut('fast')
            });
    });
  }
}
