import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Trainings} from '../../shared/model/trainings/Trainings.model';
import {Inscriptions} from '../../shared/model/Inscriptions.model';

import {TrainingsService} from '../../shared/service/trainings/trainings.service';
import {InscriptionsService} from '../../shared/service/trainings/inscriptions.service';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Store} from '@ngrx/store';
import * as fromRoot from 'src/app/common/index';
import {Location} from '@angular/common';


@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss', './trainings.adaptive.component.scss'],
  animations: [
    trigger('up', [
      state('show', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),
  ]
})
export class TrainingsComponent implements OnInit {

  constructor(private serviceTrainings: TrainingsService, private router: Router,
              private inscriptionsService: InscriptionsService,
              private location: Location,
              public progressService: NgProgress, public el: ElementRef,
              private store: Store<fromRoot.AppState>) {

  }


  trainings: Trainings;

  inscriptions: Inscriptions;

  subscription: Subscription;

  state = 'hide';

  isProgress: boolean;


  ngOnInit() {
    if (this.location.path() === '/trainings') {
      console.log('location -  trainings');
    }

    window.scroll(0, 0);
    this.progressService.ref().start();
    this.getAllTrainings();
    this.getAllInscriptions();
    this.progressService.ref().complete();
    this.store.select(fromRoot.getAllTrainings).subscribe((all: Trainings) => {
      this.trainings = all;
    });
  }


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }

  }


  /**
   *  get all Inscriptions
   * ***/
  private getAllInscriptions() {
    this.inscriptionsService.getAllInscriptions().subscribe((data: Inscriptions) => {
      this.inscriptions = data;
    });
  }

  /**
   *  get all Trainings
   * **/
  private getAllTrainings() {
    // this.isProgress = true;
    // setTimeout(() => {
    // this.serviceTrainings.getAllTrainings().subscribe((data: Trainings) => {
    //   this.trainings = data;
    //   this.store.dispatch(new trainingsActions.AllTrainings(data));
    //   this.isProgress = false;
    // });
    // }, 2000);
  }


  noClickTrainings(id: number) {
    this.router.navigate(['trainings', 'training-show', id]);
  }

  scrollUp() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
