import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class PeriodService {

  constructor(private http:Http, private router: Router) { }

  create(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/period/add', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  edit(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/period/edit', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  edit_process(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/period/edit_process', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  delete(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/period/delete', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  save_eligible(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/eligible/list/add_process', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  delete_eligible(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/eligible/list/delete_process', data)
      .map((response: Response) => {
        return response.json();
      });
  }
}
