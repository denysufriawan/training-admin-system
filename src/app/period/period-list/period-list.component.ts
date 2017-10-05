import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { PeriodService } from '../../_services/period.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.css']
})
export class PeriodListComponent implements OnInit {
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'Period',icon:'calendar'},
  ];

  headerData: any = [ 
    {title:'Training Period',subtitle:'Display training period information',icon:'calendar'}
  ];
  
  constructor(private router:Router, private PeriodService:PeriodService, private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    var table = $('#training-period-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/period/list',
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
    
      'serverSide' : true,
      'processing' : false,
      "order": [[ 3, "desc" ]],
      'columnDefs' : [
        {"className":"center aligned","targets":[-1]}
      ],
      columns : [ {
        data : 'periodName'
      }, {
        data : 'active',
        render : function(data, type, row) {
          return (data=="1") ? "Yes" : "No";
        }
      }, {
        data : 'course',
        render : function(data, type, row) {
          return data.length+" Course";
        }
      }, {
        data : 'startDate'
      }, {
        data : 'endDate'
      }, {
        data : 'createdBy'
      }, {
        data : 'updatedBy'
      }, {
        data : 'anothercolumn',
        orderable : false,
        searchable : false,
        render : function(data, type, row) {
          return `
          <div data-tooltip="Edit Period" data-position="top center"><i class="blue edit icon" id="editButton" data-id="${row.idPeriod}" style="cursor:pointer"></i></div>
          <div data-tooltip="Delete Period" data-position="top center"><i class="red trash icon" id="deleteButton" data-id="${row.idPeriod}" data-name="${row.periodName}" style="cursor:pointer"></i></div>`;
        }
      } ]
    });

    var that=this;
    $(document).on('click', '#editButton', function(event) {
      that.router.navigate(['/period/edit/edit-data',$(this).data('id')])
    });

    $(document).on('click', '#deleteButton', function(event) {
      var id={id:$(this).data('id')}
      swal({
        title: "Delete Data",
        text: "Delete this period? ("+$(this).data('name')+")",
        type: "warning",
        showLoaderOnConfirm: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        preConfirm: function () {
            return new Promise(function(resolve, reject) {
              $('#loading').fadeIn('fast')
              that.PeriodService.delete(id)
                .subscribe(
                  data => {
                    if(data.status=='1'){
                      resolve(data.message);
                    } else {
                      reject(data.message)
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
            })
        }
      }).then(function (message) {
              swal({
                  type: 'success',
                  title: 'Success!',
                  text: message,
                  showCancelButton: false,
                  confirmButtonText: "OK"
              }).then(
                  function(){
                    table.ajax.reload(null,false);
                    $('#loading').fadeOut('fast')
              });
          }
      ).catch(function () {

      });
    });

    //search
    $('#searchForm')
    .form({
      inline:true,
      on:'blur',
      fields: {
        name: {
          identifier: 'name'
        },
        active: {
          identifier: 'active'
        },
        startDate: {
          identifier: 'startDate'
        },
        endDate: {
          identifier: 'endDate'
        },
        createdBy: {
          identifier: 'createdBy'
        },
        updatedBy: {
          identifier: 'updatedBy'
        }
        
      },onSuccess:(event,fields) => {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#period-content').offset().top},500);
        table.columns(0).search(fields.name);
        table.columns(1).search(fields.active);
        table.columns(3).search(fields.startDate);
        table.columns(4).search(fields.endDate);
        table.columns(5).search(fields.createdBy);
        table.columns(6).search(fields.updatedBy);
        table.draw();
      }
    });

    $('#filter-data').click(function(){
      $("#search-period-segment").slideToggle('fast');
    })

    $('#reset-search').click(function(){
      $('#searchForm').find("input[type=text]").val("");
      $('#active').dropdown("restore defaults");
      table.ajax.reload();
      $('html,body').animate({scrollTop: $('#period-content').offset().top},500); 
    })

    $('#close-search').click(function(){
      $("#search-period-segment").slideToggle('fast');
    })

    $("#refresh").click(function(){
      table.ajax.reload();
    })

    $('#active').dropdown();

    $('#start-date-search').calendar({
      type: 'date',
      endCalendar: $('#end-date-search'),
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

    $('#end-date-search').calendar({
      type: 'date',
      startCalendar: $('#start-date-search'),
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
  }
}
