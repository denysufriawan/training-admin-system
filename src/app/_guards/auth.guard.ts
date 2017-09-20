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
        return true;
      }
      else
      {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
