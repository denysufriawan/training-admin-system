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
    var userDTSelected=[]

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

    var aeplTable
    //add
    $('.add.eligible.participant')
    .modal({
      onApprove: function() {
        console.log(userDTSelected)
      },
      onShow: function() {
        aeplTable = $('#add-eligible-participant-table').on( 'processing.dt', function ( e, settings, processing ) {
          if(processing)
            $('#loading-modal').fadeIn('fast');
          else
            $('#loading-modal').fadeOut('fast');
        }).DataTable({
          'ajax' : {
            'url': 'http://localhost:8080/api/eligible/list/add/'+that.id,
            'contentType': 'application/json',
            'type': 'POST',
            'data': function(d) {
              //d.idPeriod=that.id
              return JSON.stringify(d);
            }
          },
          "destroy": true,
          "fnInitComplete": function(oSettings, json) {
            $('#eligible-participant-list-table_filter').fadeIn();
          },
          'serverSide' : true,
          'processing' : false,
          "lengthMenu": [[4, 25, 50, -1], [4, 25, 50, "All"]],
          'columnDefs' : [
            {"className":"center aligned","targets":[-1]},
            { "visible": false, "targets": [0] }
          ],
          'createdRow': function( row, data, dataIndex ) {
            $(row).attr('id', data.idUser);
          },
          'drawCallback': function (settings, json) {
            this.api().rows( function( idx, data, node ) {
            if ( $.inArray(data.idUser,userDTSelected) !== -1 ) {
              return true;
            }
            }).select();
          },
          select: {
            style: 'multi', selector: 'td:first-child .checkbox'
          },
          columns : [ 
            {
              data : 'idUser'
            },
            {
              data : 'anothercolumn',
              orderable : false,
              searchable : false,
              render : function(data, type, row) {
                return `
                    <div class="ui fitted checkbox">\
                    <input type="checkbox">\
                    <label></label>\
                    </div>`;
              }
            },
          {
            data : 'name'
          }, {
            data : 'jobStream.jobStreamName'
          }, {
            data : 'grade.gradeName'
          }, {
            data : 'email'
          }, {
            data : 'username'
          }
           ]
        });

        aeplTable.on( 'select', function( e, dt, type, indexes ) {
          if ( type === 'row' ) {
            var id = aeplTable.row( indexes ).data().idUser;
            var index = $.inArray(id, userDTSelected);
            if ( index === -1 ) {
                userDTSelected.push( id );
            }
            for(let i = 0 ; i < userDTSelected.length ; i++) {
              $('tr[id='+userDTSelected[i]+']').find('.checkbox').checkbox('check');
            }
          }
        }).on('deselect', function(e, dt, type, indexes) {
          $('tr[id='+indexes[0]+']').find('.checkbox').checkbox('uncheck');
          userDTSelected = $.grep(userDTSelected, function(value) {
            return value != indexes[0];
          });
          console.log(userDTSelected)
          // var data = aeplTable.rows( indexes ).data().pluck( 'id' );
          // console.log(data)
          // for(let i = 0 ; i < data.length ; i++) {
          //   var id = data[i];
          //   $('tr[id='+id+']').find('.checkbox').checkbox('uncheck');
          //   var index = $.inArray(id, userDTSelected);
          //   if ( index === -1 ) {
          //     userDTSelected.push( id );
          //   } else {
          //     userDTSelected.splice( index, 1 );
          //   }
          // }
        });
      },
      onHide: function(){
        userDTSelected = [];
      },
      closable: false,
      autofocus: false
    })
    .modal('attach events', '#add-eligible-participant-button');    
  
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
