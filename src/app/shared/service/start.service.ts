import { Injectable } from '@angular/core';
import {TrainingsService} from './trainings/trainings.service';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private trainingsService: TrainingsService) {
  }

  getTrainings() {
    this.trainingsService.getAllTrainingsState();
  }
}
