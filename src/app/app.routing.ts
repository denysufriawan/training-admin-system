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
import { PeriodEditDataComponent } from './period/period-edit/period-edit-data/period-edit-data.component';
import { PeriodEligibleParticipantComponent } from './period/period-edit/period-eligible-participant/period-eligible-participant.component';
import { PeriodScheduleListComponent } from './period/period-edit/period-schedule-list/period-schedule-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { HeaderComponent } from './include/header/header.component';
import { BreadcrumbComponent } from './include/breadcrumb/breadcrumb.component';
import { FooterComponent } from './include/footer/footer.component';
import { EnrollmentListComponent } from './enrollment/enrollment-list/enrollment-list.component';

const routes: Routes = [
    { path: 'dashboard',  component: DashboardComponent, canActivate:[AuthGuard]},
    { path: 'period', component: PeriodComponent, canActivate:[AuthGuard] , children : [
        { path: 'list', component: PeriodListComponent, canActivate:[AuthGuard] },
        { path: 'add', component: PeriodCreateComponent, canActivate:[AuthGuard] },
        { path: 'edit', component: PeriodEditComponent, canActivate:[AuthGuard] , children : [
            { path: 'edit-data/:id', component: PeriodEditDataComponent, canActivate:[AuthGuard] },
            { path: 'eligible-participant/:id', component: PeriodEligibleParticipantComponent, canActivate:[AuthGuard] },
            { path: 'schedule-list/:id', component: PeriodScheduleListComponent, canActivate:[AuthGuard] },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ]},
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]},
    { path: 'user', component: UserComponent, canActivate:[AuthGuard] , children :[
        { path: 'list', component: UserListComponent, canActivate:[AuthGuard] },
        { path: 'add', component: UserCreateComponent, canActivate:[AuthGuard] },
        { path: 'edit/:id', component: UserEditComponent, canActivate:[AuthGuard] },
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]},
    { path: 'enrollment', component: EnrollmentComponent, canActivate:[AuthGuard] ,children:[
        { path: 'list', component: EnrollmentListComponent, canActivate:[AuthGuard] },
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ] },
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