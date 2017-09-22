import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  current_active_role_id: String;
  current_active_role_name: String;
  current_role:any;
  current_user:any;
  role_dropdown:any[];
  constructor(private router: Router,private authService:AuthService) {
    var dropdown_data = [];

    this.current_active_role_id = this.authService.getActiveRole();
    this.current_role=this.authService.getRole();
    this.current_user=this.authService.getUser();
    if(this.current_user){
      this.current_role.forEach(element => {
        if(element.idRole==this.current_active_role_id){
          dropdown_data.push({name:element.roleName,value:element.idRole,selected:true});
        } else {
          dropdown_data.push({name:element.roleName,value:element.idRole});
        }
        
      });
      this.role_dropdown = dropdown_data;
    }

    this.authService.userSubs.subscribe(data => {
      var dropdown_data = [];
      this.current_active_role_id = this.authService.getActiveRole();
      this.current_role=this.authService.getRole();
      this.current_user=this.authService.getUser();

      this.current_role.forEach(element => {
        if(element.idRole==this.current_active_role_id){
          dropdown_data.push({name:element.roleName,value:element.idRole,selected:true});
        } else {
          dropdown_data.push({name:element.roleName,value:element.idRole});
        }
        
      });
      this.role_dropdown = dropdown_data;
      $('#account-dropdown').dropdown('destroy').dropdown();
      $('#role-dropdown').dropdown('destroy')
      .dropdown({
        values: this.role_dropdown,
        onChange: (value,text,selectedItem)=> {
          console.log(value)
          console.log(this.current_active_role_id)
          if(value && value!=this.current_active_role_id)
          {
            this.authService.setActiveRoleState(value);
            swal({
              type: 'success',
              title: 'Success!',
              text: 'You have changed your role to '+ text,
              showCancelButton: false,
              confirmButtonText: "OK"
            }).then(
              function(){
                  
            });
          }
        }
      });
    });
  }

  ngOnInit() {
    $('#account-dropdown').dropdown();
    
    $('#role-dropdown')
    .dropdown({
      values: this.role_dropdown,
      onChange: (value,text,selectedItem)=> {
        console.log(value)
        console.log(this.current_active_role_id)
        if(value && value!=this.current_active_role_id)
        {
          this.authService.setActiveRoleState(value);
          swal({
            type: 'success',
            title: 'Success!',
            text: 'You have changed your role to '+ text,
            showCancelButton: false,
            confirmButtonText: "OK"
          }).then(
            function(){
                
          });
        }
      }
    });

    this.router.events.subscribe((event)=>{
      if(this.router.url.match('/login'))
        $('.top.menu').addClass('hide')
      else
        $('.top.menu').removeClass('hide')
    })

    if(this.current_active_role_id == "1") this.current_active_role_name = "Admin";
    else if(this.current_active_role_id == "2") this.current_active_role_name = "Trainer";
    else if(this.current_active_role_id == "3") this.current_active_role_name = "Manager";
    else if(this.current_active_role_id == "4") this.current_active_role_name = "Participants";
  }

  toggle(){
    $('.ui.sidebar').sidebar('toggle');
  }

  logOut(){
    this.authService.logout();
  }
}
