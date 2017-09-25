import { Injectable } from '@angular/core';
import { adminRoutes, trainerRoutes, managerRoutes, participantsRoutes } from '../_classes/sidebarRoute';
import { Router } from '@angular/router';

@Injectable()
export class SidebarService {

  constructor(private router: Router) { }

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

  setActiveSidebar(userRoute):any
  {
    this.router.events.subscribe((event)=>{
      if(!this.router.url.match('/login'))
      {
        try
        {
          userRoute.forEach(element => {
            if(this.router.url.match(element.path)) {
              element.class='active';
            } else {
              element.class='';
            }
          });
        }
        catch(e)
        {

        }
      }
    })
  }
}
