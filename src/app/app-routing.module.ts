import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component-pages/home/home.component';
import {TrainingsComponent} from './component-pages/trainings/trainings.component';
import {OrderComponent} from './component-pages/order/order.component';

import {WebinarsComponent} from './component-pages/webinars/webinars.component';
import {ScheduleComponent} from './component-pages/schedule/schedule.component';
import {RoomRentalComponent} from './component-pages/room-rental/room-rental.component';
import {RecommendationsComponent} from './component-pages/recommendations/recommendations.component';
import {AuthGuardService} from './admin/auth/service/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {CoachComponent} from './coach/coach.component';
import {ShowCouchResumeComponent} from './coach/show-couch-resume/show-couch-resume.component';
import {TrainingShowComponent} from './component-pages/trainings/training-show/training-show.component';
import {WebinarShowComponent} from './component-pages/webinars/webinar-show/webinar-show.component';
import {OrderFormWebinarComponent} from './component-pages/webinars/webinar-show/order-form-webinar/order-form-webinar.component';
import {OrderStatusComponent} from './component-pages/webinars/webinar-show/order-form-webinar/order-status/order-status.component';
import {ShowRoomInfoComponent} from './component-pages/room-rental/show-room-info/show-room-info.component';
import {OrderRoomComponent} from './component-pages/room-rental/order-room/order-room.component';

const routes: Routes = [

  /**
   * custom url.
   * **/
  {path: '', component: HomeComponent},

  /**
   * trainings
   * ***/
  {path: 'trainings', component: TrainingsComponent},
  {path: 'trainings/training-show/:id', component: TrainingShowComponent},
  {path: 'trainings-order', component: OrderComponent},
  {path: 'trainings/coach/resume/:id', component: ShowCouchResumeComponent},
  {path: 'trainings/coach', component: CoachComponent},


  /**
   * webinar
   * ***/
  {path: 'webinars', component: WebinarsComponent},
  {path: 'webinars/webinar-show/:id', component: WebinarShowComponent},
  {path: 'webinars/webinar-order-form', component: OrderFormWebinarComponent},
  {path: 'webinars/webinar-order/status/:id', component: OrderStatusComponent},

  /**
   * schedule
   * ***/
  {path: 'schedule', component: ScheduleComponent},

  /**
   * room rental;
   * **/
  {path: 'room-rental', component: RoomRentalComponent},
  {path: 'room-rental/show/:id', component: ShowRoomInfoComponent},
  {path: 'room/order/:id', component: OrderRoomComponent},
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
