import {Component, OnInit} from '@angular/core';
import {Trainers} from '../shared/model/Trainers.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainersService} from '../shared/service/trainers.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-coach-resume',
  templateUrl: './coach-resume.component.html',
  styleUrls: ['./coach-resume.component.scss', './coach-resume.adaptive.component.scss']
})
export class CoachResumeComponent implements OnInit {


  trainers: Trainers;
  trainersAll: Trainers;
  id: number;
  photo: any;

  constructor(private idNumber: ActivatedRoute, public trainersService: TrainersService, private router: Router,
              public progressService: NgProgress) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getAllTrainers();
  }

  /***
   *  routing
   * ***/
  transferPage(elem) {
    this.router.navigate(['trainings', 'coach-resume-show', elem.id]);
    this.trainers = elem;
  }


  /***
   *  routing in mobile version
   * ***/
  transferPageMobile(elem) {
    this.router.navigate(['trainings', 'coach-resume-show', elem.id]);
    this.trainers = elem;
    scroll(0, 220);
  }


  /**
   * get all Trainers
   * ***/
  getAllTrainers() {
    this.progressService.ref().start();
    this.trainersService.getAllTrainers().subscribe((data: Trainers) => {
      this.trainersAll = data;
      this.progressService.ref().complete();
    });
  }
}
