import { Injectable } from '@angular/core';
import { adminRoutes, trainerRoutes, managerRoutes, participantsRoutes } from '../_classes/sidebarRoute';

@Injectable()
export class SidebarService {

  constructor() { }

  getSidebarRoute(role:string):any
  {
    if(role=="1"){
      return adminRoutes;
    } else if (role=="2") {
      return trainerRoutes;
    } else if (role=="3") {
      return managerRoutes;
    } else if (role=="4") {
      return participantsRoutes;
    }
  }
}
