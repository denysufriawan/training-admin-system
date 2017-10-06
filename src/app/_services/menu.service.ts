import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

declare var $:any;
declare var swal:any;
@Injectable()
export class MenuService {

  current_active_role_id: String;

  constructor(private authService:AuthService, private route:Router) { }

  setRoleDropdown(current_user:any):void
  {
    try
    {
      var dropdown_data = [];
      this.current_active_role_id = this.authService.getActiveRole();
      current_user.role.forEach(element => {
        if(element.idRole==this.current_active_role_id)
          dropdown_data.push({name:element.roleName,value:element.idRole,selected:true});
        else
          dropdown_data.push({name:element.roleName,value:element.idRole});
      });
  
      $('#account-dropdown').dropdown('destroy').dropdown();
      $('#role-dropdown').dropdown('destroy')
      .dropdown({
        values: dropdown_data,
        onChange: (value,text,selectedItem)=> {
          
          this.authService.setActiveRoleState(value);
          this.authService.setActiveRole(value);
          
          if(value && value!=this.current_active_role_id)
          {
            swal({
              type: 'success',
              title: 'Success!',
              text: 'You have changed your role to '+ text,
              showCancelButton: false,
              confirmButtonText: "OK"
            }).then(
              function(){
                
            });

            //redirect to dashboard if have not permission
            if (this.route.url.match('/user')) {
              if(this.authService.getActiveRole()!='1') {
                this.route.navigate(['/dashboard']);
              }
            } else if (this.route.url.match('/training')) {
              if(this.authService.getActiveRole()!='1' && this.authService.getActiveRole()!='2') {
                this.route.navigate(['/dashboard']);
              }
            }

            this.current_active_role_id = this.authService.getActiveRole();
          }
        }
      });
    }
    catch (ex)
    {
      
    }
  }
}
