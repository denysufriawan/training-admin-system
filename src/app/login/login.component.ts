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
    this.loading = true;
    this.authService.login(form)
      .subscribe(
          data => {
              if(data.status=='1')
              {
                localStorage.setItem('user', JSON.stringify(data.message));
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
                        
                });
                this.loading = false;
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
                      
              });
          this.loading = false;
    });
  }

}
