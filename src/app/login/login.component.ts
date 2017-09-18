import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  returnUrl: string;

  constructor(private authService: AuthService, private router: Router) { }

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

  login() {
    if (!this.model.username) {
      swal(
        'Oops...',
        'Username must be filled!',
        'error'
      )
    } else if (!this.model.password) {
      swal(
        'Oops...',
        'Password must be filled!',
        'error'
      )
    } else {
      this.router.navigateByUrl('/dashboard');
    }
    
    // this.loading = true;
    // this.authService.login(this.model.username, this.model.password)
    //   .subscribe(
    //       data => {
    //           this.router.navigate(['/dashboard']);
    //       },
    //       error => {
    //           swal(
    //             'Oops...',
    //             'Username or Password Incorrect!',
    //             'error'
    //           )
    //           this.loading = false;
    //       });
  }

}
