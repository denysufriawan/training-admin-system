import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PeriodService } from '../../../_services/period.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-period-eligible-participant',
  templateUrl: './period-eligible-participant.component.html',
  styleUrls: ['./period-eligible-participant.component.css']
})
export class PeriodEligibleParticipantComponent implements OnInit {
  id:any
  
  constructor(private ActivatedRoute: ActivatedRoute,private PeriodService:PeriodService) { }

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
          <div data-tooltip="Delete Data" data-position="top center"><i class="red trash icon" id="deleteButton" data-id="${row.idUser}" data-idperiod="${that.id}" data-name="${row.name}" style="cursor:pointer"></i></div>`;
        }
      } ]
    });

   
    $('#add-eligible-participant-table thead tr#filterrow th').each( function () {
        var title = $('#add-eligible-participant-table thead th').eq( $(this).index() ).text();
        if(title)
          $(this).html( '<div class="ui input" style="width:100%"><input type="text"  placeholder="Search '+title+'" /></div>' );
    } );

    $("#add-eligible-participant-table thead .input input").on( 'keyup change', function () {
        aeplTable
            .column( $(this).parent().parent().index()+':visible' )
            .search( this.value )
            .draw();
    } );

    var aeplTable
    //add
    $('.add.eligible.participant')
    .modal({
      onShow: function() {
        $('.add.eligible.participant').modal('refresh');

        $("#checkAll").prop('checked', false);
        $('#add-eligible-participant-table').DataTable().rows().deselect();

        aeplTable = $('#add-eligible-participant-table').on( 'processing.dt', function ( e, settings, processing ) {
          if(processing)
            $('#loading-modal').fadeIn('fast');
          else
            $('#loading-modal').fadeOut('fast');
        }).DataTable({
          'ajax' : {
            'url': 'http://localhost:8080/api/eligible/list/add/'+that.id,
            'type': 'POST'
          },
          "destroy": true,
          "fnInitComplete": function(oSettings, json) {
            $('#eligible-participant-list-table_filter').fadeIn();
            $('.add.eligible.participant').modal('refresh');

            //select all process
            $('#checkAll').change(function() {
                if (this.checked) {
                    $('#add-eligible-participant-table').DataTable().rows().select();
                    // $("th.select-checkbox").removeClass("selected");
                } else {
                    $('#add-eligible-participant-table').DataTable().rows().deselect();
                    // $("th.select-checkbox").addClass("selected");
                }
            })


          },
          'processing' : false,
          'bSortCellsTop': true,
          'autoWidth': false,
          'columnDefs' : [
            { width: '5%', targets: 0 },
            { width: '26%', targets: 1 },
            { width: '12%', targets: 2 },
            { width: '10%', targets: 3 },
            { width: '26%', targets: 4 },
            { width: '21%', targets: 5 },
            {
              searchable: false,
              orderable: false,
              className: 'select-checkbox',
              targets:   0,
              'checkboxes': {
                'selectRow': true
             }
            }
          ],
          // 'order': [[2,'asc']],
          // 'createdRow': function( row, data, dataIndex ) {
          //   $(row).attr('id', data.idUser);
          // },
          // 'drawCallback': function (settings, json) {
          //   this.api().rows( function( idx, data, node ) {
          //   if ( $.inArray(data.idUser,that.userDTSelected) !== -1 ) {
          //     return true;
          //   }
          //   }).select();
          // },
          select: {
            style: 'multi', selector: 'td:first-child'
          },
          columns : [ 
          {
            data : 'idUser',
            orderable : false,
            searchable : false,
            render : function(data, type, row) {
              return ``;
            }
          },
          {
            data : 'name'
          }, {
            data : 'jobStream.jobFamily.jobFamilyNameShort',
            render : function(data, type, row) {
              return `${data} - ${row.jobStream.jobStreamNameShort}`;
            }
          }, {
            data : 'grade.gradeNameShort'
          }, {
            data : 'email'
          }, {
            data : 'username'
          }
           ]
        });
      },
      onHide: function(){
        aeplTable.destroy();
      },
      closable: false,
      autofocus: false
    })
    .modal('attach events', '#add-eligible-participant-button');

    // .on("select deselect", function() {
    //     ("Some selection or deselection going on")
    //     if (aeplTable.rows({
    //             selected: true
    //         }).count() !== aeplTable.rows().count()) {
    //         $("th.select-checkbox").removeClass("selected");
    //     } else {
    //         $("th.select-checkbox").addClass("selected");
    //     }
    // });
  
    $(document).on('click', '#deleteButton', function(event) {
      var id_user = $(this).data('id');
      var id_period = $(this).data('idperiod')
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
              that.PeriodService.delete_eligible({id_user:id_user,id_period:id_period})
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
                    eplTable.ajax.reload(null,false);
                    $('#loading').fadeOut('fast')
              });
          }
      ).catch(function () {

      });
    });

    //save eligible process
    $("#save-eligible").click(function(){
      var ids = $.map($('#add-eligible-participant-table').DataTable().rows('.selected').data(), function (item) {
          return item.idUser;
      });
      $('#loading-modal').fadeIn('fast')
      that.PeriodService.save_eligible({data:ids.join(),id:that.id})
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
                      $('#loading-modal').fadeOut('fast')
                      $('.add.eligible.participant').modal('hide');
                      $('#eligible-participant-list-table').DataTable().ajax.reload(null,false);
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
                      $('#loading-modal').fadeOut('fast')
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
                  $('#loading-modal').fadeOut('fast')
            });
          });
    })
  }
}
