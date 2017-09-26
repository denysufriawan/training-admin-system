import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';

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
  
  constructor(private router:Router, private BreadcrumbService:BreadcrumbService, private HeaderService:HeaderService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('#training-period-table').on( 'processing.dt', function ( e, settings, processing ) {
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
      'dom': '<""\
              <"ui left floated segment basic no-margin no-padding"l>\
              <"ui right floated segment basic no-margin no-padding">\
              >\
              <tr>\
              <""\
              <"ui left floated segment basic no-margin no-padding"i>\
              <"ui right floated segment basic no-margin no-padding"p>\
              >',
      'serverSide' : true,
      'processing' : false,
      'columnDefs' : [
        {"className":"center aligned","targets":[-1]}
      ],
      columns : [ {
        data : 'periodName'
      }, {
        data : 'active'
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
          <i class="blue edit icon" id="editButton" data-id="${row.idPeriod}" style="cursor:pointer"></i>
          <i class="red trash icon" id="deleteButton" data-id="${row.idPeriod}" data-name="${row.periodName}" style="cursor:pointer"></i>`;
        }
      } ]
    });

    var that=this;
    $(document).on('click', '#editButton', function(event) {
      that.router.navigate(['/period/edit',$(this).data('id')])
    });

    $(document).on('click', '#deleteButton', function(event) {
      swal({
        title: "Delete Data",
        text: "Delete this period? ("+$(this).data('name')+")",
        type: "warning",
        showLoaderOnConfirm: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url:"deleteData",
                    type:"post",
                    data:{'id':$(this).data('id')},
                    success:function(data){
                        if(data.status)
                            resolve(data.message);
                        else
                            reject(data.message);
                    }                      
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
                      
              });
          },
          function () {

          }
      );

    });

  }
}
