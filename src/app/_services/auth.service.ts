import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private role = new Subject<any>();
  private user = new Subject<any>();
  public roleSubs = this.role.asObservable();
  public userSubs = this.user.asObservable();

  constructor(private http:Http, private router: Router) { }

  login(data): Observable<any> {
    return this.http.post('http://172.19.14.124:8080/api/login', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  isLogin(): boolean {
    if (localStorage.getItem('user') && localStorage.getItem('activeRole')) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  setUser(user: string): void {
    localStorage.setItem('user', user);
  }

  setActiveRoleState(role: string): void {
    this.role.next(role);
  }

  setUserState(user: string): void {
    this.user.next(user);
  }

  setActiveRole(role: string): void {
    localStorage.setItem('activeRole', role);
  }

  getActiveRole(): string {
    return localStorage.getItem('activeRole');
  }

  getRole(): any {
    if(this.getUser())
      return JSON.parse(localStorage.getItem('user')).role;
    else
      return false
  }

  getUser(): any {
      return JSON.parse(localStorage.getItem('user'));
  }
}
