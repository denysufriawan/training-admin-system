import { Injectable } from '@angular/core';
import { adminRoutes, trainerRoutes, managerRoutes, participantsRoutes } from '../_classes/sidebarRoute';
import { Router } from '@angular/router';

@Injectable()
export class SidebarService {

  constructor() { }

 getSidebarRoute(role:string):any
  {
    if(role=="1")
      return adminRoutes;
    else if (role=="2")
      return trainerRoutes;
    else if (role=="3")
      return managerRoutes;
    else if (role=="4")
      return participantsRoutes;
    else
      return [];
  }

  setActiveSidebar(userRoute,route):any
  {
    userRoute.forEach(element => {
      if(route.match(element.path)) {
        element.class='active';
      } else {
        element.class='';
      }
    });
    return userRoute;
  }
}
