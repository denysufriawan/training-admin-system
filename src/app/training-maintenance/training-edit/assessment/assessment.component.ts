import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TrainingService } from '../../../_services/training.service';
import { BreadcrumbService } from '../../../_services/breadcrumb.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  id:any;
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/training',title:'Training Maintenance',icon:'desktop'},
    {link:'',title:'Assessment',icon:'trophy'}
  ];
  constructor(private BreadcrumbService:BreadcrumbService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private TrainingService: TrainingService) { }

  ngOnInit() {
    var that = this;
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.ActivatedRoute.params.subscribe(params => {
      this.id=params['id']
    });

    var table = $('#assessment-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'fnInitComplete':function(){
        $('.dataTables_filter').fadeIn('fast')
        $('.pass').dropdown()
      },
      'ordering':false,
      'paging':false,
      'ajax' : {
        'url': 'http://localhost:8080/api/assessment/list/'+that.id,
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'processing' : false,
      'columnDefs' : [
        {"className":"center aligned","targets":[-1],"width":"5%"}
      ],
      columns : [ {
        data : 'user.name',
        render : function(data, type, row) {
          return `${data}<input type="hidden" name="idUserCourse[]" value="${row.idUserCourse}">`;
        }
      }, {
        data : 'anothercolumn',
        searchable:false,
        render : function(data, type, row) {
          $(`#pass${row.idUserCourse}`).dropdown('set selected',row.pass)
          return `
          <select class="ui pass dropdown" name="pass[]" id="pass${row.idUserCourse}">
          <option value="">-- Status --</option>
          <option value="1">Pass</option>
          <option value="0">Fail</option>
          </select>`;
        }
      } ]
    });

    $('.editAssessment')
    .submit(function(){
      $('#loading').fadeIn('fast')
      var idUserCourse = $("input[name='idUserCourse[]']")
      .map(function(){return $(this).val();}).get();
      var pass = $("select[name='pass[]']")
      .map(function(){return $(this).val();}).get();
      that.TrainingService.edit({idUserCourseInput:idUserCourse,passInput:pass})
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
                      that.router.navigate(['/training']);
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
    });
  }

}
