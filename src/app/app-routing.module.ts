import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TrainingsComponent} from './trainings/trainings.component';
import {OrderComponent} from './order/order.component';
import {CoachResumeComponent} from './coach-resume/coach-resume.component';
import {WebinarsComponent} from './webinars/webinars.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {RoomRentalComponent} from './room-rental/room-rental.component';
import {RecommendationsComponent} from './recommendations/recommendations.component';
import {AuthGuardService} from './admin/auth/service/auth-guard.service';
import {LoginComponent} from './login/login.component';

const routes: Routes = [

  /**
   * custom url.
   * **/
  {path: '', component: HomeComponent},
  {path: 'trainings', component: TrainingsComponent},
  {path: 'trainings-order', component: OrderComponent},
  {path: 'trainings/coach-resume-show/:id', component: CoachResumeComponent},
  {path: 'webinars', component: WebinarsComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'room-rental', component: RoomRentalComponent},
  {path: 'recommendations', component: RecommendationsComponent},

  /**
   * admin child module.
   * **/
  {path: 'login', component: LoginComponent},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuardService]},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
