import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BreadcrumbService {
  private breadcrumb = new Subject<any>();

  public breadcrumbSubs = this.breadcrumb.asObservable();

  constructor() { }

  setCurrentBreadcumb(breadcrumbText:any){
    this.breadcrumb.next(breadcrumbText);
  }
}
