import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';

import {TrainingsComponent} from './trainings/trainings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {OrderComponent} from './order/order.component';

import {WebinarsComponent} from './webinars/webinars.component';
import {RecommendationsComponent} from './recommendations/recommendations.component';
import {RoomRentalComponent} from './room-rental/room-rental.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {httpInterceptorProviders} from './admin/auth/auth-intrcerptor';
import {LoginComponent} from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProgressBarModule} from 'angular-progress-bar';
import {FullCalendarModule} from 'ng-fullcalendar';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuardService} from './admin/auth/service/auth-guard.service';
import {NgProgressModule} from '@ngx-progressbar/core';
import {MenuAnimateComponent} from './menu-animate/menu-animate.component';
import {MenuComponent} from './menu/menu.component';
import {CoachComponent} from './coach/coach.component';
import {ShowCouchResumeComponent} from './coach/show-couch-resume/show-couch-resume.component';
import {TrainingShowComponent} from './trainings/training-show/training-show.component';
import {WebinarShowComponent} from './webinars/webinar-show/webinar-show.component';
import {OrderFormWebinarComponent} from './webinars/webinar-show/order-form-webinar/order-form-webinar.component';
import {OrderStatusComponent} from './webinars/webinar-show/order-form-webinar/order-status/order-status.component';
import {AngularFormioPdfModule} from 'angular-formio-pdf';
import { LoaderComponent } from './loader/loader.component';
import { ShowRoomInfoComponent } from './room-rental/show-room-info/show-room-info.component';
import { OrderRoomComponent } from './room-rental/order-room/order-room.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TrainingsComponent,
    OrderComponent,
    WebinarsComponent,
    RecommendationsComponent,
    RoomRentalComponent,
    ScheduleComponent,
    LoginComponent,
    MenuAnimateComponent,
    MenuComponent,
    CoachComponent,
    ShowCouchResumeComponent,
    TrainingShowComponent,
    WebinarShowComponent,
    OrderFormWebinarComponent,
    OrderStatusComponent,
    LoaderComponent,
    ShowRoomInfoComponent,
    OrderRoomComponent
  ],
  imports: [
    BrowserModule,
    AngularFormioPdfModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    RouterModule,
    ProgressBarModule,
    BsDatepickerModule.forRoot(),
    AngularEditorModule,
    NgxPaginationModule,
    FullCalendarModule,
    NgbModule,
    BrowserAnimationsModule,
    NgProgressModule,
    NgbModule,

  ],
  providers: [httpInterceptorProviders, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
