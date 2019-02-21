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
import {CoachResumeComponent} from './coach-resume/coach-resume.component';
import {CoachShowComponent} from './coach-resume/coach-show/coach-show.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TrainingsComponent,
    OrderComponent,
    CoachResumeComponent,
    CoachShowComponent,
    WebinarsComponent,
    RecommendationsComponent,
    RoomRentalComponent,
    ScheduleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ProgressBarModule,
    BsDatepickerModule.forRoot(),
    AngularEditorModule,
    NgxPaginationModule,
    FullCalendarModule,
    NgbModule,
    BrowserAnimationsModule,
    NgProgressModule

  ],
  providers: [httpInterceptorProviders, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
