import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';


declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    $('.ui.large.form.login-form')
    .form({
      inline:true,
      on:'blur',
      fields: {
        username: {
          identifier: 'username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your logon name'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your password'
            }
          ]
        }
      },onSuccess:(event,fields) => {
        event.preventDefault();
        this.login(fields)
      }
    });
  }

  login(form) {
    $('#loading').fadeIn('fast')
    this.authService.login(form)
      .subscribe(
        data => {
            if(data.status=='1')
            {
              this.authService.setUser(JSON.stringify(data.message.user));
              this.authService.setUserState(JSON.stringify(data.message.user));

              this.authService.setActiveRole(data.message.activeRole);
              this.authService.setActiveRoleState(data.message.activeRole);
              this.router.navigate(['/dashboard']); 
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
                text: "Oops, something goes wrong!",
                showCancelButton: false,
                confirmButtonText: "OK"
            }).then(
                function(){
                  $('#loading').fadeOut('fast')
            });
    });
  }
}
