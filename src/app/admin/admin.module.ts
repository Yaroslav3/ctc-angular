import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminPhotoPageComponent} from './admin/admin-photo-page/admin-photo-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule, TabsModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {AdminUserComponent} from './admin/admin-user/admin-user.component';
import {AdminVideoComponent} from './admin/admin-video/admin-video.component';
import {ProgressBarModule} from 'angular-progress-bar';
import {AdminUserServiceComponent} from './admin/admin-user-service/admin-user-service.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {AdminRecommendationsComponent} from './admin-recommendations/admin-recommendations.component';
import {AdminRoomRentalComponent} from './admin-room-rental/admin-room-rental.component';
import {AdminScheduleComponent} from './admin-schedule/admin-schedule.component';
import {AdminTrainingsComponent} from './admin-trainings/admin-trainings.component';
import {AdminWebinarsComponent} from './admin-webinars/admin-webinars.component';
import {DataCalendarComponent} from './admin-trainings/data-calendar/data-calendar.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import {DataOrderComponent} from './admin-trainings/data-order/data-order.component';
import {ViewOrderComponent} from './admin-trainings/data-order/view-order/view-order.component';
import {DataTrainersComponent} from './admin-trainings/data-trainers/data-trainers.component';
import {TrainersAddComponent} from './admin-trainings/data-trainers/trainers-add/trainers-add.component';
import {TrainersEditComponent} from './admin-trainings/data-trainers/trainers-edit/trainers-edit.component';
import {DataTrainingsComponent} from './admin-trainings/data-trainings/data-trainings.component';
import {TrainingsAddComponent} from './admin-trainings/data-trainings/trainings-add/trainings-add.component';
import {TrainingsEditComponent} from './admin-trainings/data-trainings/trainings-edit/trainings-edit.component';
import {InscriptionsComponent} from './admin-trainings/inscriptions/inscriptions.component';
import {HttpClientModule} from '@angular/common/http';
import {NgProgressModule} from '@ngx-progressbar/core';


const routes: Routes = [
  {path: '', component: AdminComponent, pathMatch: 'full'},

  /**
   *  Home page
   * **/
  {path: 'home/user', component: AdminUserComponent},
  {path: 'home/photo-page', component: AdminPhotoPageComponent},
  {path: 'home/video-page', component: AdminVideoComponent},
  {path: 'home/service', component: AdminUserServiceComponent},

  /**
   * Trainings page
   * **/
  {path: 'trainings', component: AdminTrainingsComponent},
  {path: 'trainings/trainings-edit/:id', component: TrainingsEditComponent},
  {path: 'trainings/data-trainings', component: DataTrainingsComponent},
  {path: 'trainings/trainings-add', component: TrainingsAddComponent},
  {path: 'trainings/trainings-add', component: TrainingsAddComponent},

  {path: 'trainings/data-calendar', component: DataCalendarComponent},
  {path: 'trainings/data-order', component: DataOrderComponent},
  {path: 'trainings/view-order/:id', component: ViewOrderComponent},
  {path: 'trainings/data-trainers', component: DataTrainersComponent},

  {path: 'trainings/trainers-edit/:id', component: TrainersEditComponent},
  {path: 'trainings/trainers-add', component: TrainersAddComponent},
  {path: 'trainings/inscriptions', component: InscriptionsComponent},

  /**
   * Webinars page
   * **/
  {path: 'webinars', component: AdminWebinarsComponent},

  /**
   * Schedule page
   * **/
  {path: 'schedule', component: AdminScheduleComponent},

  /**
   * Room-rental page
   * **/
  {path: 'room-rental', component: AdminRoomRentalComponent},

  /**
   * Recommendations page
   * **/
  {path: 'recommendations', component: AdminRecommendationsComponent}


];

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminPhotoPageComponent,
    AdminUserComponent,
    AdminVideoComponent,
    AdminUserServiceComponent,
    AdminRecommendationsComponent,
    AdminRoomRentalComponent,
    AdminScheduleComponent,
    AdminTrainingsComponent,
    AdminWebinarsComponent,
    DataCalendarComponent,
    DataOrderComponent,
    ViewOrderComponent,
    DataTrainersComponent,
    TrainersAddComponent,
    TrainersEditComponent,
    DataTrainingsComponent,
    TrainingsAddComponent,
    TrainingsEditComponent,
    InscriptionsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgxPaginationModule,
    ProgressBarModule,
    NgbModule,
    FullCalendarModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgProgressModule

  ]
})
export class AdminModule {
}
