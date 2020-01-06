import {Component, ElementRef, OnInit} from '@angular/core';
import {Video} from '../../shared/model/Video.model';
import {Trainers} from '../../shared/model/Trainers.model';
import {Location, ViewportScroller} from '@angular/common';
import {VideoService} from '../../shared/service/video.service';
import {PhotoStartPageService} from '../../shared/service/photo-start-page.service';
import {PhotoStartPage} from '../../shared/model/PhotoStartPage';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgProgress} from '@ngx-progressbar/core';
import {StartService} from '../../shared/service/start.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../common';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.adaptive.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('void', style({'background-color': '#848484'})),
      transition('void => *', animate(1000)),
      transition('* => *', animate(500)),
    ]),
  ]
})
export class HeaderComponent implements OnInit {

  isVisible: boolean;
  name: string;

  /**
   * show video
   * ***/
  video: Video;


  /**
   * model Trainers
   * **/
  trainers: Trainers;

  /**
   * photo start page Home Page
   * **/
  homePhoto: any;

  /**
   * photo start page Trainings
   * **/
  trainingsPhoto: any;

  /**
   * photo start page Webinars
   * **/
  webinarsPhoto: any;

  /**
   * photo start page Order
   * **/
  orderPhoto: any;

  /**
   * photo start page Coach
   * **/
  coachPhoto: any;

  /**
   * photo start page Schedule
   * **/
  schedule: any;

  /**
   * photo start page Room Rental
   * **/
  roomRental: any;


  /**
   * photo start page Room Recommendations
   * **/
  recommendations: any;

  /**
   * for show photo and hidden photo
   * **/
  showStatusPhoto: boolean;

  /***
   * to display header
   * **/
  login = true;

  backgroundImageStyle: any = './assets/img/test10.jpg';
  private base64 = 'data:image/jpg;base64,';


  /**
   *url for hidden photo customer
   * **/
  private names: string[] = ['/trainings', '/trainings/coach', '/webinars', '/schedule',
    '/room-rental', '/recommendations', '/login'];


  /**
   * url for hidden photo admin panel
   * **/
  private admin: string[] = [

    /**
     * admin Admin
     * **/
    '/admin',
    '/admin/home/user',
    '/admin/home/photo-page',
    '/admin/webinars',
    '/admin/schedule',
    '/admin/room-rental',
    '/admin/recommendations',
    '/admin/home/video-page',
    '/admin/home/service',
    '/admin/trainings/inscriptions',

    /**
     * admin Trainings
     * **/
    '/admin/trainings',
    '/admin/trainings/data-trainers',
    '/admin/trainings/data-trainings',
    '/admin/trainings/data-calendar',
    '/admin/trainings/trainings-edit/',
    '/admin/trainings/data-order',
    '/admin/trainings/trainings-choose/',
    '/admin/trainings/trainings-add',
    '/admin/trainings/trainers-edit/',
    '/admin/trainings/contacts/', '/login',
    '/admin/trainings/trainers-add',
    '/admin/trainings/view-order/',
    '/admin/trainings/update/article-trainings/',
    '/admin/trainings/create/article-trainings/',


    /**
     * admin Webinars
     * **/
    '/admin/webinars/data-webinars',
    '/admin/webinars/webinar-add',
    '/admin/webinars/webinars-edit/',
    '/admin/webinars/webinar-add/photo-add/',
    '/admin/webinars/inscriptions',
    '/admin/webinars/webinars-edit/webinar-order/',
    '/admin/webinars/webinar-order-show/',

    /**
     * admin Blog
     * **/
    '/admin/blog',
    '/admin/blog/data-blog',
    '/admin/blog/blog-edit/',
    '/admin/blog/data-add',
    '/admin/blog/create-photo/',

    /**
     * Room rental
     * ***/
    '/admin/room/rental/data',
    '/admin/room/rental/add-room',
    '/admin/room/rental/add-room-rental/',
    '/admin/room/rental/add-prise-room/',
    '/admin/room/rental/add-photo-room/',
    '/admin/room/rental/edit-room/',
    '/admin/room/rental/edit-room/name/',
    '/admin/room/rental/edit-room/price/',
    '/admin/room/rental/edit-room/photo/',
    '/admin/room/rental/edit-room/show-order-room/',
    '/admin/room/rental/edit-room/article/',
    '/admin/room/rental/show-order-room-one/',

    /**
     * customer
     * **/
    '/trainings/coach/resume/',
    '/trainings/training-show/',
    '/trainings-order',
    '/webinars/webinar-show/',
    '/webinars/webinar-order-form',
    '/webinars/webinar-order/status/',
    '/room-rental/show/',
    '/room/order/',

  ];


  protected titleText = 'Corporate Training Company, since 1999';

  burgerMenu: boolean;


  constructor(private location: Location,
              private photoService: PhotoStartPageService,
              private videoService: VideoService,
              public progress: NgProgress,
              public el: ElementRef,
              private route: ActivatedRoute,
              private store: Store<fromRoot.AppState>,
              private startService: StartService) {
    this.burgerMenu = true;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getVideoStart();
    this.setPhoto('home');
    this.getAllPhotoStartPage();
    this.startService.getTrainings();
    this.startService.getTrainers();
  }


  animPhoto() {
    this.isVisible = true;
  }


  /**
   *  burger view (mobile version)
   * ***/
  burger() {
    window.scroll(0, 0);
    this.burgerMenu = true;
  }

  /**
   *  burger hidden (mobile version)
   * ***/
  burgerHidden() {
    this.burgerMenu = false;
  }


  /**
   * show video Start Page
   ***/
  getVideoStart() {
    this.videoService.showVideo().subscribe((data: Video) => {
      this.video = data;
    });
  }

  /**
   * get all photo start page and show
   * **/
  getAllPhotoStartPage() {
    this.progress.ref().start();
    this.photoService.customerPhotoStartPageGetAll().subscribe((data: PhotoStartPage) => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        const a = data[i];
        if (a.namePage === 'home') {
          this.homePhoto = this.base64 + a.photo;
        } else if (a.namePage === 'trainings') {
          this.trainingsPhoto = this.base64 + a.photo;
        } else if (a.namePage === 'coach') {
          this.coachPhoto = this.base64 + a.photo;
        } else if (a.namePage === 'webinars') {
          this.webinarsPhoto = this.base64 + a.photo;
        } else if (a.namePage === 'schedule') {
          this.schedule = this.base64 + a.photo;
        } else if (a.namePage === 'room-rental') {
          this.roomRental = this.base64 + a.photo;
        } else if (a.namePage === 'recommendations') {
          this.recommendations = this.base64 + a.photo;
        }
      }
      this.progress.ref().complete();
    });
  }

  /**
   *  get photo name start page
   * **/
  public setPhoto(name: string) {
    console.log('name', name);
    if (name === '') {
      console.log('name_2', name);
    }
    this.photoService.customerPhotoStartPageGetOneForName(name).subscribe((response) => {
      console.log('photo', response);
    });
  }

  /**
   * hidden header teg for admin panel
   * **/
  public isHiddenAdmin(): boolean {
    for (let i = 0; i < this.admin.length; i++) {
      if (this.admin[i] === this.location.path().replace(/[0-9]/g, '')) {
        return this.showStatusPhoto = false;
      }
    }
    return true;
  }


  public isHidden(): boolean {
    for (let i = 0; i < this.names.length; i++) {
      if (this.names[i] === this.location.path().replace(/[0-9]/g, '')) {
        return this.showStatusPhoto = false;
      }
    }
    return true;
  }

  public isPhotoTrainings(): boolean {
    if (this.names[0] === this.location.path()) {
      return this.showStatusPhoto = true;
    }
    return false;
  }

  public isPhotoCoachResume(): boolean {
    if (this.names[1] === this.location.path().replace(/[0-9]/g, '')) {
      return this.showStatusPhoto = true;
    }
    return false;
  }

  public isPhotoWebinars(): boolean {
    if (this.names[2] === this.location.path()) {
      return this.showStatusPhoto = true;
    }
    return false;
  }

  public isSchedule(): boolean {
    if (this.names[3] === this.location.path()) {
      return this.showStatusPhoto = true;
    }
    return false;
  }

  public isRoomRental(): boolean {
    if (this.names[4] === this.location.path()) {
      return this.showStatusPhoto = true;
    }
    return false;
  }

  public isRecommendations(): boolean {
    if (this.names[5] === this.location.path()) {
      return this.showStatusPhoto = true;
    }
    return false;
  }

  // public isPhotoOrder(): boolean {
  //   if (this.names[2] === this.location.path()) {
  //     return this.showStatusPhoto = true;
  //   }
  //   return false;
  // }


  public auth(): boolean {
    if (this.names[6] === this.location.path()) {
      return this.login = false;
    }
    return this.login = true;
  }


}
