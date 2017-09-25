import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PeriodComponent } from './period/period.component';
import { UserComponent } from './user/user.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { AchievementComponent } from './achievement/achievement.component';
import { TrainingMaintenanceComponent } from './training-maintenance/training-maintenance.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './include/sidebar/sidebar.component';
import { MenuComponent } from './include/menu/menu.component';
import { PeriodListComponent } from './period/period-list/period-list.component';
import { PeriodCreateComponent } from './period/period-create/period-create.component';
import { PeriodEditComponent } from './period/period-edit/period-edit.component';
import { HeaderComponent } from './include/header/header.component';
import { BreadcrumbComponent } from './include/breadcrumb/breadcrumb.component';
import { FooterComponent } from './include/footer/footer.component';

const routes: Routes = [
    { path: 'dashboard',  component: DashboardComponent, canActivate:[AuthGuard]},
    { path: 'period', component: PeriodComponent, canActivate:[AuthGuard] , children : [
        { path: 'list', component: PeriodListComponent, canActivate:[AuthGuard] },
        { path: 'add', component: PeriodCreateComponent, canActivate:[AuthGuard] },
        { path: 'edit', component: PeriodEditComponent, canActivate:[AuthGuard] },
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ]},
    { path: 'user', component: UserComponent, canActivate:[AuthGuard] },
    { path: 'enrollment', component: EnrollmentComponent, canActivate:[AuthGuard] },
    { path: 'achievement', component: AchievementComponent, canActivate:[AuthGuard] },
    { path: 'training', component: TrainingMaintenanceComponent, canActivate:[AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}