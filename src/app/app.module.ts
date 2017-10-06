import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './_guards/auth.guard';

import { AppRoutingModule } from './app.routing';

import { AuthService } from './_services/auth.service';
import { BreadcrumbService } from './_services/breadcrumb.service';
import { HeaderService } from './_services/header.service';
import { MenuService } from './_services/menu.service';
import { PeriodService } from './_services/period.service';
import { UserService } from './_services/user.service';
import { SidebarService } from './_services/sidebar.service';
import { DropdownService } from './_services/dropdown.service';
import { TrainingService } from './_services/training.service';

import { AppComponent } from './app.component';
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
import { PeriodEditDataComponent } from './period/period-edit/period-edit-data/period-edit-data.component';
import { PeriodEligibleParticipantComponent } from './period/period-edit/period-eligible-participant/period-eligible-participant.component';
import { PeriodScheduleListComponent } from './period/period-edit/period-schedule-list/period-schedule-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { EnrollmentListComponent } from './enrollment/enrollment-list/enrollment-list.component';
import { TrainingListComponent } from './training-maintenance/training-list/training-list.component';
import { TrainingEditComponent } from './training-maintenance/training-edit/training-edit.component';
import { AttendanceComponent } from './training-maintenance/training-edit/attendance/attendance.component';
import { AssessmentComponent } from './training-maintenance/training-edit/assessment/assessment.component';
import { AttendanceEditComponent } from './training-maintenance/training-edit/attendance-edit/attendance-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PeriodComponent,
    UserComponent,
    EnrollmentComponent,
    AchievementComponent,
    TrainingMaintenanceComponent,
    LoginComponent,
    SidebarComponent,
    MenuComponent,
    PeriodListComponent,
    PeriodCreateComponent,
    PeriodEditComponent,
    HeaderComponent,
    BreadcrumbComponent,
    PeriodEditDataComponent,
    PeriodEligibleParticipantComponent,
    PeriodScheduleListComponent,
    NotFoundComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    EnrollmentListComponent,
    TrainingListComponent,
    TrainingEditComponent,
    AttendanceComponent,
    AssessmentComponent,
    AttendanceEditComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService,
              AuthGuard,
              BreadcrumbService,
              HeaderService,
              MenuService,
              PeriodService,
              UserService,
              SidebarService,
              DropdownService,
              TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
