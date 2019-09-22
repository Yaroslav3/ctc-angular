import {Component, OnInit} from '@angular/core';
import {TrainersService} from '../shared/service/trainers.service';
import {Trainers} from '../shared/model/Trainers.model';
import {Router} from '@angular/router';
import * as fromRoot from '../common';
import {Trainings} from '../shared/model/trainings/Trainings.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss', './coach.adaptive.component.scss']
})
export class CoachComponent implements OnInit {

   public trainers: Trainers;
  isProgress: boolean;

  constructor(private trainersService: TrainersService,
              private router: Router,
              private store: Store<fromRoot.AppState>) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.store.select(fromRoot.getAllTrainers).subscribe((trainers: Trainers) => this.trainers = trainers);
  }


  redirect(elem) {
    this.router.navigate(['trainings', 'coach', 'resume', elem.id]);
  }
}
