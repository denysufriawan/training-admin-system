import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PeriodService } from '../../../_services/period.service';
import { AuthService } from '../../../_services/auth.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-period-edit-data',
  templateUrl: './period-edit-data.component.html',
  styleUrls: ['./period-edit-data.component.css']
})
export class PeriodEditDataComponent implements OnInit {
  period:any={};
  constructor(private PeriodService:PeriodService, private AuthService:AuthService, private router:Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      var id={id:params['id']}
      this.PeriodService.edit(id)
      .subscribe(
        data => {
          if(data.status=='1'){
            this.period=data.message;
            if(this.period.active=="1")
            {
              $("#active").attr( 'checked', true )
            }
            $('#loading').fadeOut('fast')
          } else {
            this.router.navigate(['/period/list']);
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
    });

    $('#start-date-edit-period').calendar({
      type: 'date',
      endCalendar: $('#end-date-edit-period'),
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

    $('#end-date-edit-period').calendar({
      type: 'date',
      startCalendar: $('#start-date-edit-period'),
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

    $('.ui.form.editPeriod')
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
        // fields.createdBy = this.AuthService.getUserId();
        fields.updatedBy = this.AuthService.getUser().name;
        this.editPeriod(fields);
      }
    });
  }

  editPeriod(form) {
    var that=this;
    $('#loading').fadeIn('fast')
    this.PeriodService.edit_process(form)
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
