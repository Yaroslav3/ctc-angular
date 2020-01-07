import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './global-components/header/header.component';
import {FooterComponent} from './global-components/footer/footer.component';
import {HomeComponent} from './component-pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';

import {TrainingsComponent} from './component-pages/trainings/trainings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {OrderComponent} from './component-pages/order/order.component';

import {WebinarsComponent} from './component-pages/webinars/webinars.component';
import {RecommendationsComponent} from './component-pages/recommendations/recommendations.component';
import {RoomRentalComponent} from './component-pages/room-rental/room-rental.component';
import {ScheduleComponent} from './component-pages/schedule/schedule.component';
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
import {CoachComponent} from './coach/coach.component';
import {ShowCouchResumeComponent} from './coach/show-couch-resume/show-couch-resume.component';
import {TrainingShowComponent} from './component-pages/trainings/training-show/training-show.component';
import {WebinarShowComponent} from './component-pages/webinars/webinar-show/webinar-show.component';
import {OrderFormWebinarComponent} from './component-pages/webinars/webinar-show/order-form-webinar/order-form-webinar.component';
import {OrderStatusComponent} from './component-pages/webinars/webinar-show/order-form-webinar/order-status/order-status.component';
import {AngularFormioPdfModule} from 'angular-formio-pdf';
import { LoaderComponent } from './global-components/loader/loader.component';
import { ShowRoomInfoComponent } from './component-pages/room-rental/show-room-info/show-room-info.component';
import { OrderRoomComponent } from './component-pages/room-rental/order-room/order-room.component';
import { SortPipe } from './shared/pipe/sort.pipe';
import {StoreModule} from '@ngrx/store';
import {reducers} from './common';
import { MenuAppComponent } from './global-components/menu-app/menu-app.component';


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
    CoachComponent,
    ShowCouchResumeComponent,
    TrainingShowComponent,
    WebinarShowComponent,
    OrderFormWebinarComponent,
    OrderStatusComponent,
    LoaderComponent,
    ShowRoomInfoComponent,
    OrderRoomComponent,
    SortPipe,
    MenuAppComponent,
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
    StoreModule.forRoot(reducers)

  ],
  providers: [httpInterceptorProviders, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
