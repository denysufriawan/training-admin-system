import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { UserService } from '../../_services/user.service';
import { DropdownService } from '../../_services/dropdown.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  roleDrop=[];
  gradeDrop=[];
  streamDrop=[];
  familyDrop=[];
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'',title:'User',icon:'users'},
  ];

  headerData: any = [ 
    {title:'Users List',subtitle:'Display and manage users data in the system',icon:'users'}
  ];
  constructor(private router:Router,
              private BreadcrumbService:BreadcrumbService,
              private HeaderService:HeaderService,
              private UserService:UserService,
              private DropdownService:DropdownService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    var that=this;

    var table = $('#users-table').on( 'processing.dt', function ( e, settings, processing ) {
      if(processing)
        $('#loading').fadeIn('fast');
      else
        $('#loading').fadeOut('fast');
    }).DataTable({
      'ajax' : {
        'url': 'http://localhost:8080/api/user/list',
        'contentType': 'application/json',
        'type': 'POST',
        'data': function(d) {
          return JSON.stringify(d);
        }
      },
      'responsive': true,
      'serverSide' : true,
      'processing' : false,
      "order": [[ 1, "asc" ]],
      'columnDefs' : [
        {"className":"center aligned","targets":[-2]}
      ],
      columns : [ 
      {
        data : 'idUser'
      },
      {
        data : 'name'
      },{
        data : 'email'
      },{
        data : 'jobStream.idJobStream',
        render : function(data, type, row) {
          return `${row.jobStream.jobFamily.jobFamilyNameShort} - ${row.jobStream.jobStreamNameShort}`;
        }
      },{
        data : 'grade.idGrade',
        render : function(data, type, row) {
          return row.grade.gradeNameShort
        }
      },{
        data : 'username'
      }, {
        data : 'active',
        render : function(data, type, row) {
          return (data=="1") ? "Yes" : "No";
        }
      },{
        data : 'role.idRole',
        orderable:false,
        render : function(data, type, row) {
          var role='';
          row.role.forEach(element => {
            role+=element.roleName+', ';
          });
          return role.slice(0, -2)
        }
      }, {
        data : 'anothercolumn',
        orderable : false,
        searchable : false,
        render : function(data, type, row) {
          return `
          <div data-tooltip="Edit Data" data-position="top center"><i class="blue edit icon" id="editButton" data-id="${row.idUser}" style="cursor:pointer"></i></div>`;
        }
      },{
        data : 'jobStream.jobFamily.idJobFamily',
        visible:false
      } ]
    });

    $(document).on('click', '#editButton', function(event) {
      that.router.navigate(['/user/edit',$(this).data('id')])
    });

    //search
    $('#searchForm')
    .form({
      inline:true,
      on:'blur',
      fields: {
        idUser: {
          identifier: 'idUser'
        },
        name: {
          identifier: 'name'
        },
        username: {
          identifier: 'username'
        },
        email: {
          identifier: 'email'
        },
        active: {
          identifier: 'active'
        },
        role: {
          identifier: 'role'
        },
        jobFamily: {
          identifier: 'jobFamily'
        },
        jobStream: {
          identifier: 'jobStream'
        },
        grade: {
          identifier: 'grade'
        }
        
      },onSuccess:(event,fields) => {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#user-content').offset().top},500);
        table.columns(0).search(fields.idUser);
        table.columns(1).search(fields.name);
        table.columns(2).search(fields.email);
        table.columns(3).search(fields.jobStream);
        table.columns(4).search(fields.grade);
        table.columns(5).search(fields.username);
        table.columns(6).search(fields.active);
        table.columns(7).search(fields.role);
        table.columns(9).search(fields.jobFamily);
        table.draw();
      }
    });

    $('#filter-data').click(function(){
      $("#search-user-segment").slideToggle('fast');
    })

    $('#reset-search').click(function(){
      $('#searchForm').find("input[type=text]").val("");
      $('#active').dropdown("restore defaults");
      $('#role').dropdown("restore defaults");
      $('#jobFamily').dropdown("restore defaults");
      $('#jobStream').dropdown("restore defaults");
      $('#grade').dropdown("restore defaults");
      table.ajax.reload();
      $('html,body').animate({scrollTop: $('#user-content').offset().top},500); 
    })

    $('#close-search').click(function(){
      $("#search-user-segment").slideToggle('fast');
    })

    $("#refresh").click(function(){
      table.ajax.reload();
    })

    //dropdown
    $('#active').dropdown();

    this.DropdownService.getRole()
    .subscribe(
      data => {
          this.roleDrop=data.message
    });

    this.DropdownService.getJobFamily()
    .subscribe(
      data => {
        this.familyDrop=data.message
    });
  
    $('#role').dropdown();
    $('#jobFamily').dropdown({
      onChange: (value,text,selectedItem)=> {
        this.initGradeDrop(value);
        this.initJobStreamDrop(value);
      }
    });
    $('#jobStream').dropdown();
    $('#grade').dropdown();
  }

  initJobStreamDrop(idJF){
    this.DropdownService.getJobStream({id:idJF})
    .subscribe(
      data => {
        this.streamDrop=data.message          
    });
  }

  initGradeDrop(idJF){
    this.DropdownService.getGrade({id:idJF})
    .subscribe(
      data => {
        this.gradeDrop=data.message         
    });
  }
}
