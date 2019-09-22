import {Injectable} from '@angular/core';
import {TrainingsService} from './trainings/trainings.service';
import {TrainersService} from './trainers.service';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private trainingsService: TrainingsService,
              private trainersService: TrainersService) {
  }

  getTrainings() {
    this.trainingsService.getAllTrainingsState();
  }

  getTrainers() {
    this.trainersService.getAllTrainersState();
  }

  getTrainingsAdmin() {
    this.trainingsService.getAllTrainingsStateAdmin();
  }

  getTrainersAdmin() {
    this.trainersService.getAllTrainersStateAdmin();
  }
}
