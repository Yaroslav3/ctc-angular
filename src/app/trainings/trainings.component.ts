import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Trainers} from '../shared/model/Trainers.model';
import {Trainings} from '../shared/model/Trainings.model';
import {Inscriptions} from '../shared/model/Inscriptions.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';

import {TrainingsService} from '../shared/service/trainings.service';
import {InscriptionsService} from '../shared/service/inscriptions.service';
import {TrainersService} from '../shared/service/trainers.service';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
        state('hide',   style({
          opacity: 0,
          transform: 'translateX(-100%)'
        })),
        transition('show => hide', animate('300ms ease-out')),
        transition('hide => show', animate('300ms ease-in'))
    ])
  ]
})
export class TrainingsComponent implements OnInit {

  constructor(private serviceTrainers: TrainersService, private serviceTrainings: TrainingsService,
              private router: Router, private inscriptionsService: InscriptionsService,
              public progressService: NgProgress, public el: ElementRef) {
  }

  trainers: Trainers;
  trainings: Trainings;

  inscriptions: Inscriptions;

  subscription: Subscription;

  state = 'hide';


  editorConfig: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
    height: 'auto',
    defaultFontSize: '5',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  ngOnInit() {
    window.scroll(0, 0);
    this.progressService.ref().start();
    this.getAllTrainers();
    this.getAllTrainings();
    this.getAllInscriptions();
    this.progressService.ref().complete();
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

    this.serviceTrainings.getAllTrainings().subscribe((data: Trainings) => {
      this.trainings = data;

    });
  }

  private getAllTrainers() {
    this.serviceTrainers.getAllTrainers().subscribe((data: Trainers) => {
      this.trainers = data;
    });
  }

  onClick(trainers: Trainers) {
    this.router.navigate(['trainings', 'coach-resume-show', trainers.id]);
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
