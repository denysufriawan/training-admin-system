import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class DropdownService {

  constructor(private http:Http, private router: Router) { }

  getRole(): Observable<any> {
    return this.http.get('http://localhost:8080/api/dropdown/role/list')
      .map((response: Response) => {
        return response.json();
      });
  }

  getJobFamily(): Observable<any> {
    return this.http.get('http://localhost:8080/api/dropdown/jobFamily/list')
      .map((response: Response) => {
        return response.json();
      });
  }

  getJobStream(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/dropdown/jobStream/list',data)
      .map((response: Response) => {
        return response.json();
      });
  }

  getGrade(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/dropdown/grade/list',data)
      .map((response: Response) => {
        return response.json();
      });
  }

  getPlacement(): Observable<any> {
    return this.http.get('http://localhost:8080/api/dropdown/placement/list')
      .map((response: Response) => {
        return response.json();
      });
  }

  getAbsence(): Observable<any> {
    return this.http.get('http://localhost:8080/api/dropdown/absence/list')
      .map((response: Response) => {
        return response.json();
      });
  }
}
