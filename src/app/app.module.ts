import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PeriodComponent } from './period/period.component';
import { UserComponent } from './user/user.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { AchievementComponent } from './achievement/achievement.component';
import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './include/sidebar/sidebar.component';
import { MenuComponent } from './include/menu/menu.component';
import { PeriodListComponent } from './period/period-list/period-list.component';
import { PeriodAddComponent } from './period/period-create/period-create.component';
import { PeriodEditComponent } from './period/period-edit/period-edit.component';
import { HeaderComponent } from './include/header/header.component';
import { BreadcrumbComponent } from './include/breadcrumb/breadcrumb.component';
import { FooterComponent } from './include/footer/footer.component';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';

const routes: Routes = [
  { path: 'dashboard',  component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'period', component: PeriodComponent , canActivate:[AuthGuard], children : [
    { path: 'list', component: PeriodListComponent, canActivate:[AuthGuard] },
    { path: 'add', component: PeriodAddComponent, canActivate:[AuthGuard] },
    { path: 'edit', component: PeriodEditComponent, canActivate:[AuthGuard] },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: '**', redirectTo: 'list', pathMatch: 'full' },
  ]},
  { path: 'user', component: UserComponent },
  { path: 'enrollment', component: EnrollmentComponent },
  { path: 'achievement', component: AchievementComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PeriodComponent,
    UserComponent,
    EnrollmentComponent,
    AchievementComponent,
    TrainingComponent,
    LoginComponent,
    SidebarComponent,
    MenuComponent,
    PeriodListComponent,
    PeriodAddComponent,
    PeriodEditComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
