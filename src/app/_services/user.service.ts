import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http:Http, private router: Router) { }

  create(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/add', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  edit(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/edit', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  edit_process(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/edit_process', data)
      .map((response: Response) => {
        return response.json();
      });
  }
}
