import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminPhotoPageComponent} from './admin/admin-photo-page/admin-photo-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule, ModalModule, TabsModule} from 'ngx-bootstrap';
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
import {ContactsComponent} from './admin-trainings/data-trainers/trainers-edit/contacts/contacts.component';

import {DataWebinarsComponent} from './admin-webinars/data-webinar/data-webinars.component';
import {WebinarAddComponent} from './admin-webinars/data-webinar/webinar-add/webinar-add.component';
import {WebinarEditComponent} from './admin-webinars/data-webinar/webinar-edit/webinar-edit.component';
import {AddPhotoWebinarComponent} from './admin-webinars/data-webinar/webinar-add/add-photo-webinar/add-photo-webinar.component';
import {InscriptionWebinarComponent} from './admin-webinars/inscription-webinar/inscription-webinar.component';
import {WebinarOrderDetailsComponent} from './admin-webinars/data-webinar/webinar-edit/webinar-order-details/webinar-order-details.component';
import {WebinarOrderShowComponent} from './admin-webinars/data-webinar/webinar-edit/webinar-order-details/webinar-order-show/webinar-order-show.component';
import {AdminBlogComponent} from './admin-blog/admin-blog.component';
import {DataBlogComponent} from './admin-blog/data-blog/data-blog.component';
import {BlogEditComponent} from './admin-blog/data-blog/blog-edit/blog-edit.component';
import {BlogAddComponent} from './admin-blog/data-blog/blog-add/blog-add.component';
import {AddBlogFirstPhotoComponent} from './admin-blog/data-blog/blog-add/add-blog-first-photo/add-blog-first-photo.component';
import {EditArticleComponent} from './admin-trainings/data-trainings/trainings-edit/edit-article/edit-article.component';
import {AddArticleTrainingsComponent} from './admin-trainings/data-trainings/trainings-add/add-article-trainings/add-article-trainings.component';
import {DataRoomComponent} from './admin-room-rental/data-room/data-room.component';
import {AddRoomComponent} from './admin-room-rental/data-room/add-room/add-room.component';
import {AddArticleRoomComponent} from './admin-room-rental/data-room/add-room/add-article-room/add-article-room.component';
import {AddPriseRoomComponent} from './admin-room-rental/data-room/add-room/add-prise-room/add-prise-room.component';
import {AddPhotoComponent} from './admin-room-rental/data-room/add-room/add-photo/add-photo.component';
import {EditRoomComponent} from './admin-room-rental/data-room/edit-room/edit-room.component';
import {EditPriceRoomComponent} from './admin-room-rental/data-room/edit-room/edit-price-room/edit-price-room.component';
import {EditNameRoomComponent} from './admin-room-rental/data-room/edit-room/edit-name-room/edit-name-room.component';
import {EditPhotoRoomComponent} from './admin-room-rental/data-room/edit-room/edit-photo-room/edit-photo-room.component';
import {ShowOrderRoomComponent} from './admin-room-rental/data-room/edit-room/show-order-room/show-order-room.component';
import {EditArticleRoomComponent} from './admin-room-rental/data-room/edit-room/edit-article-room/edit-article-room.component';
import {ShowOrderRoomOneComponent} from './admin-room-rental/data-room/edit-room/show-order-room/show-order-room-one/show-order-room-one.component';
import {FoundRoomComponent} from './admin-room-rental/data-room/found-room/found-room.component';


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
  {path: 'trainings/create/article-trainings/:id', component: AddArticleTrainingsComponent},

  {path: 'trainings/data-calendar', component: DataCalendarComponent},
  {path: 'trainings/data-order', component: DataOrderComponent},
  {path: 'trainings/view-order/:id', component: ViewOrderComponent},
  {path: 'trainings/data-trainers', component: DataTrainersComponent},
  {path: 'trainings/update/article-trainings/:id', component: EditArticleComponent},

  {path: 'trainings/trainers-edit/:id', component: TrainersEditComponent},
  {path: 'trainings/contacts/:id', component: ContactsComponent},
  {path: 'trainings/trainers-add', component: TrainersAddComponent},
  {path: 'trainings/inscriptions', component: InscriptionsComponent},

  /**
   * Webinars page
   * **/
  {path: 'webinars', component: AdminWebinarsComponent},
  {path: 'webinars/data-webinars', component: DataWebinarsComponent},
  {path: 'webinars/webinar-add', component: WebinarAddComponent},
  {path: 'webinars/webinar-add/photo-add/:id', component: AddPhotoWebinarComponent},
  {path: 'webinars/webinars-edit/:id', component: WebinarEditComponent},
  {path: 'webinars/webinars-edit/webinar-order/:id', component: WebinarOrderDetailsComponent},
  {path: 'webinars/webinar-order-show/:id', component: WebinarOrderShowComponent},
  {path: 'webinars/inscriptions', component: InscriptionWebinarComponent},

  /**
   * Schedule page
   * **/
  {path: 'schedule', component: DataCalendarComponent},

  /**
   * Blog page
   * **/
  {path: 'blog', component: AdminBlogComponent},
  {path: 'blog/data-blog', component: DataBlogComponent},
  {path: 'blog/data-add', component: BlogAddComponent},
  {path: 'blog/create-photo/:id', component: AddBlogFirstPhotoComponent},
  {path: 'blog/blog-edit/:id', component: BlogEditComponent},

  /**
   * Room-rental page
   * **/
  {path: 'room-rental', component: FoundRoomComponent},
  {path: 'room/rental/data', component: DataRoomComponent},
  {path: 'room/rental/add-room', component: AddRoomComponent},
  {path: 'room/rental/add-room-rental/:id', component: AddArticleRoomComponent},
  {path: 'room/rental/add-prise-room/:id', component: AddPriseRoomComponent},
  {path: 'room/rental/add-photo-room/:id', component: AddPhotoComponent},
  {path: 'room/rental/edit-room/:id', component: EditRoomComponent},
  {path: 'room/rental/edit-room/name/:id', component: EditNameRoomComponent},
  {path: 'room/rental/edit-room/price/:id', component: EditPriceRoomComponent},
  {path: 'room/rental/edit-room/photo/:id', component: EditPhotoRoomComponent},
  {path: 'room/rental/edit-room/article/:id', component: EditArticleRoomComponent},
  {path: 'room/rental/edit-room/show-order-room/:id', component: ShowOrderRoomComponent},
  {path: 'room/rental/show-order-room-one/:id', component: ShowOrderRoomOneComponent},


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
    ContactsComponent,
    DataWebinarsComponent,
    WebinarAddComponent,
    WebinarEditComponent,
    AddPhotoWebinarComponent,
    InscriptionWebinarComponent,
    WebinarOrderDetailsComponent,
    WebinarOrderShowComponent,
    AdminBlogComponent,
    DataBlogComponent,
    BlogEditComponent,
    BlogAddComponent,
    AddBlogFirstPhotoComponent,
    EditArticleComponent,
    AddArticleTrainingsComponent,
    DataRoomComponent,
    AddRoomComponent,
    AddArticleRoomComponent,
    AddPriseRoomComponent,
    AddPhotoComponent,
    EditRoomComponent,
    EditPriceRoomComponent,
    EditNameRoomComponent,
    EditPhotoRoomComponent,
    ShowOrderRoomComponent,
    EditArticleRoomComponent,
    ShowOrderRoomOneComponent,
    FoundRoomComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
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
