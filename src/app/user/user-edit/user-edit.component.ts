import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../_services/breadcrumb.service';
import { HeaderService } from '../../_services/header.service';
import { UserService } from '../../_services/user.service';
import { DropdownService } from '../../_services/dropdown.service';
import { AuthService } from '../../_services/auth.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:any={}
  roleDrop=[];
  breadcrumbData: any = [
    {link:'/dashboard',title:'Dashboard',icon:'dashboard'},
    {link:'/user',title:'User',icon:'users'},
    {link:'',title:'Edit',icon:'edit'}
  ];

  headerData: any = [ 
    {title:'User - Edit',subtitle:'Modify user role and status',icon:'edit'}
  ];
  constructor(private router:Router,
    private BreadcrumbService:BreadcrumbService,
    private HeaderService:HeaderService,
    private UserService:UserService,
    private DropdownService:DropdownService,
    private AuthService: AuthService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.BreadcrumbService.setCurrentBreadcumb(this.breadcrumbData);
    this.HeaderService.setCurrentHeader(this.headerData);
    this.ActivatedRoute.params.subscribe(params => {
      var id={id:params['id']}
      this.UserService.edit(id)
      .subscribe(
        data => {
          if(data.status=='1'){
            this.user=data.message;
            $('#active').dropdown("set selected", this.user.active); 
            this.user.role.forEach(element => {
              $('#rolelist').dropdown("set selected", element.idRole); 
            });
            this.user.placement=data.placement
            $('#loading').fadeOut('fast')
          } else {
            this.router.navigate(['/user/list']);
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

    this.DropdownService.getRole()
    .subscribe(
      data => {
          this.roleDrop=data.message
    });
    $('#rolelist').dropdown();
    $('#active').dropdown();

    $('.ui.form.editUser')
    .form({
      inline:true,
      on:'blur',
      fields: {
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
        }
      },onSuccess:(event,fields) => {
        event.preventDefault();
        fields.updatedBy = this.AuthService.getUser().name;
        this.editUser(fields);
      }
    });
  }
  editUser(form) {
    var that=this;
    $('#loading').fadeIn('fast')
    this.UserService.edit_process(form)
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
