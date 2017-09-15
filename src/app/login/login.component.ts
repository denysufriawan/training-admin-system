import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    // $('.ui.large.form.login-form')
    // .form({
    //   fields: {
    //     username: {
    //       identifier: 'username',
    //       rules: [
    //         {
    //           type   : 'empty',
    //           prompt : 'Please enter your logon name'
    //         }
    //       ]
    //     },
    //     password: {
    //       identifier: 'password',
    //       rules: [
    //         {
    //           type   : 'empty',
    //           prompt : 'Please enter your password'
    //         }
    //       ]
    //     }
    //   }
    // });
    
  }

}
