import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http:Http,  private router: Router) { }

  login(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  isLogin(): boolean {
    if (localStorage.getItem('user'))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }
}
