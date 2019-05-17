import {Component, OnInit} from '@angular/core';
import {TrainersService} from '../shared/service/trainers.service';
import {Trainers} from '../shared/model/Trainers.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss', './coach.adaptive.component.scss']
})
export class CoachComponent implements OnInit {

  trainers: Trainers;
  isProgress: boolean;

  constructor(private trainersService: TrainersService, private router: Router) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAllTrainers();
  }


  getAllTrainers() {
    this.isProgress = true;
    // console.log('start');
    // setTimeout(() => {
    this.trainersService.getAllTrainers().subscribe((data: Trainers) => {
      this.trainers = data;
      // console.log(data);
      this.isProgress = false;
      // console.log('end');
    });
    // }, 6000);
  }

  redirect(elem) {
    this.router.navigate(['trainings', 'coach', 'resume', elem.id]);
  }
}
