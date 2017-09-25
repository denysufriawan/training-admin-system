import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HeaderService {
  private header = new Subject<any>();
  
  public headerSubs = this.header.asObservable();

  constructor() { }

  setCurrentHeader(headerText:any){
    this.header.next(headerText);
  }
}
