import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare var $:any;
declare var swal:any;
@Injectable()
export class MenuService {

  current_active_role_id: String;
  current_role:any[];
  role_dropdown:any[];

  constructor(private authService:AuthService) { }

  setRoleDropdown():void
  {
    var dropdown_data = [];
    this.current_active_role_id = this.authService.getActiveRole();
    this.current_role=this.authService.getRole();

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
        if(value && value!=this.current_active_role_id)
        {
          this.authService.setActiveRoleState(value);
          this.authService.setActiveRole(value);
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
  }
}
