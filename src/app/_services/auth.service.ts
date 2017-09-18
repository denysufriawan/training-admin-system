import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http:Http,  private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:4200/api/login', { username: username, password: password })
      .map((response: Response) => {
        var responseData = response.json();
        if (responseData.status == 'success') {
          localStorage.setItem('currentUser', JSON.stringify(responseData.data.user));
          return true;
        } else {
          return false;
        }
      });
  }
}
