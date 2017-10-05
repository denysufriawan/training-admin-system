import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class TrainingService {

  constructor(private http:Http, private router: Router) { }

  edit(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/assessment/edit', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  editAttendance(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/attendance-user/edit', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  getDetail(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/training/getDetail', data)
      .map((response: Response) => {
        return response.json();
      });
  }
}
