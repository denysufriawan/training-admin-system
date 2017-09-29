import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-period-eligible-participant',
  templateUrl: './period-eligible-participant.component.html',
  styleUrls: ['./period-eligible-participant.component.css']
})
export class PeriodEligibleParticipantComponent implements OnInit {
  id:any
  constructor(private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    var that = this;

    this.ActivatedRoute.params.subscribe(params => {
      this.id=params['id']
    });

    var eplTable = $('#eligible-participant-list-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/eligible/list/'+that.id,
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'serverSide' : true,
      'processing' : false,
      'columnDefs' : [
        {"className":"center aligned","targets":[-1]}
      ],
      columns : [ {
        data : 'name'
      }, {
        data : 'anothercolumn',
        orderable : false,
        searchable : false,
        render : function(data, type, row) {
          return `
          <i class="red trash icon" id="deleteButton" data-id="${row.name}" data-name="${row.name}" style="cursor:pointer"></i>`;
        }
      } ]
    });

    var aeplTable = $('#add-eligible-participant-list-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/eligible/list',
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          //d.idPeriod=that.id
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
        data : 'anothercolumn',
        orderable : false,
        searchable : false,
        render : function(data, type, row) {
          return `
          <div class="ui checkbox"><input type="checkbox" data-id="" data-name=""><label></label></div>;`;
        }
      }, {
        data : 'name'
      }, {
        data : 'jobStream'
      }, {
        data : 'grade'
      }, {
        data : 'email'
      }, {
        data : 'username'
      } ]
    });

    $('#add-eligible-participant-button').click(function(){
      $('.large.modal.add.eligible.participant').modal('show');
    })
    $('#save-modal').click(function(){
      //do save
    })

    $('#close-modal').click(function(){
      $('.large.modal.add.eligible.participant').modal('hide');
    })

    $(document).on('click', '#deleteButton', function(event) {
      var id={id:$(this).data('id')}
      swal({
        title: "Delete Data",
        text: "Delete this user? ("+$(this).data('name')+")",
        type: "warning",
        showLoaderOnConfirm: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        preConfirm: function () {
            return new Promise(function(resolve, reject) {
              $('#loading').fadeIn('fast')
              // that.PeriodService.delete(id)
              //   .subscribe(
              //     data => {
              //       if(data.status=='1'){
              //         resolve(data.message);
              //       } else {
              //         reject(data.message)
              //       }
              //     },
              //     error => {
              //       swal({
              //             type: 'error',
              //             title: 'Error!',
              //             text: "Oops, the server can not be reached!",
              //             showCancelButton: false,
              //             confirmButtonText: "OK"
              //         }).then(
              //             function(){
              //               $('#loading').fadeOut('fast')
              //         });
              //   });
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
                    eplTable.ajax.reload(null,false);
                    $('#loading').fadeOut('fast')
              });
          }
      ).catch(function () {

      });
    });
  }
}
