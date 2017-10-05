import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { UserService } from '../../_services/user.service';
import { DropdownService } from '../../_services/dropdown.service';
import { AuthService } from '../../_services/auth.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  roleDrop=[];
  gradeDrop=[];
  streamDrop=[];
  familyDrop=[];
  placementDrop=[];
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/user',title:'User',icon:'users'},
    {link:'',title:'Create',icon:'plus'}
  ];

  headerData: any = [ 
    {title:'User - Create',subtitle:'Create new user',icon:'plus'}
  ];

  constructor(private router:Router,
    private BreadcrumbService:BreadcrumbService,
    private HeaderService:HeaderService,
    private UserService:UserService,
    private DropdownService:DropdownService,
    private AuthService: AuthService) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);

    $('.ui.form.createUser')
    .form({
      inline:true,
      on:'blur',
      fields: {
        name: {
          identifier: 'name',
          rules: [
            {type   : 'empty'},
            {type   : 'maxLength[100]'}
          ]
        },
        jobStream: {
          identifier: 'jobStream',
          rules: [
            {type   : 'empty'}
          ]
        },
        rolelist: {
          identifier: 'rolelist',
          rules: [
            {type   : 'empty'}
          ]
        },
        active: {
          identifier: 'active',
          rules: [
            {type   : 'empty'}
          ]
        },
        placementTest: {
          identifier: 'placementTest',
          rules: [
            {type   : 'empty'}
          ]
        },
        jobFamily: {
          identifier: 'jobFamily',
          rules: [
            {type   : 'empty'}
          ]
        },
        grade: {
          identifier: 'grade',
          rules: [
            {type   : 'empty'}
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {type   : 'empty'},
            {type   : 'minLength[6]'},
            {type   : 'maxLength[20]'}
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {type   : 'empty'},
            {type   : 'maxLength[100]'}
          ]
        },
        username: {
          identifier: 'username',
          rules: [
            {type   : 'empty'},
            {type   : 'maxLength[100]'}
          ]
        }
      },onSuccess:(event,fields) => {
        event.preventDefault();
        delete fields.jobFamily;
        fields.createdBy = this.AuthService.getUser().name;
        fields.updatedBy = this.AuthService.getUser().name;
        this.createUser(fields);
      }
    });

    //dropdown
    $('#active').dropdown();
    $('#placementTest').dropdown();
    
    this.DropdownService.getRole()
    .subscribe(
      data => {
          this.roleDrop=data.message
    });

    this.DropdownService.getPlacement()
    .subscribe(
      data => {
          this.placementDrop=data.message
    });

    this.DropdownService.getJobFamily()
    .subscribe(
      data => {
        this.familyDrop=data.message
    });
  
    $('#rolelist').dropdown();
    $('#jobFamily').dropdown({
      onChange: (value,text,selectedItem)=> {
        this.initGradeDrop(value);
        this.initJobStreamDrop(value);
      }
    });
    $('#idJobStream').dropdown();
    $('#idGrade').dropdown();
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

  createUser(form) {
    var that=this;
    $('#loading').fadeIn('fast')
    this.UserService.create(form)
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
                    that.router.navigate(['/user']);
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
