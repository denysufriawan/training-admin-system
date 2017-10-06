import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService:AuthService) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isLogin()) {
        if (state.url.match('/user')) {
          if(this.authService.getActiveRole()=='1') {
            return true;
          } else {
            this.router.navigate(['/dashboard']);
            return false
          }
        } else if (state.url.match('/training')) {
          if(this.authService.getActiveRole()=='1' || this.authService.getActiveRole()=='2') {
            return true;
          } else {
            this.router.navigate(['/dashboard']);
            return false
          }
        } else if(state.url.match('/login')) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      } else {
        if(state.url.match('/login')) {
          return true;
        } else{
          this.router.navigate(['/login']);
          return false;
        }
      }
  }
}
