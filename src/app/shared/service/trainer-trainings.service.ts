import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment, eTrainerTrainings} from '../../../environments/environment';
import {TrainerTrainings} from '../model/TrainerTrainings.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerTrainingsService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /***
   *  get All Trainer Trainings (qualification)
   * ***/
  adminGetAllTrainerTrainings() {
    return this.http.get(this.host + eTrainerTrainings.adminUrlGetAllTrainerTrainings);
  }

  /***
   *  get One Trainer Trainings (qualification)
   * ***/
  adminGetOneTrainerTrainings(id: number) {
    return this.http.get(`${this.host + eTrainerTrainings.adminUrlGetOneTrainerTrainings}/${id}`);
  }

  /***
   *  get Create Trainer Trainings (qualification)
   * ***/
  adminCreateTrainerTrainings(id: number, trainerTrainings: TrainerTrainings) {
    return this.http.post(`${this.host + eTrainerTrainings.adminUrlCreateTrainerTrainings}/${id}`, trainerTrainings, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /***
   *  get delete Trainer Trainings (qualification)
   * ***/
  adminDeleteTrainerTrainings(id: number) {
    return this.http.delete(`${this.host + eTrainerTrainings.adminUrlDeleteTrainerTrainings}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   *  method for admin panel update Trainer Trainings (qualification)
   * **/
  adminUpdateTrainerTrainings(id: number, trainerTrainings: TrainerTrainings) {
    return this.http.put(`${this.host +  eTrainerTrainings.adminUrlUpdateTrainerTrainings}/${id}`, trainerTrainings, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
