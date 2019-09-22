import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Trainers} from '../model/Trainers.model';
import {eAdminTrainers, environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../common';
import * as trainersActions from '../../common/trainers/trainers.actions';


@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  private readonly host: string;

  constructor(private http: HttpClient,
              private store: Store<fromRoot.AppState>) {
    this.host = environment.host;
  }


  /**
   * get all Trainers
   * ***/
  getAllTrainers() {
    return this.http.get(this.host + environment.apiUrlTrainers);
  }


  getAllTrainersState() {
    this.http.get(this.host + environment.apiUrlTrainers).subscribe
    ((trainers) => {
      this.store.dispatch(new trainersActions.AllTrainers(trainers));
    });
  }

  /**
   * get one Trainers
   * ***/
  getOneTrainers(id: number) {
    return this.http.get(`${this.host + environment.apiUrlTrainersGetOne}/${id}`);
  }

  /**
   * all coaches who are engaged in this training
   * ***/
  getAllTrainingsSkills(id: number) {
    return this.http.get(`${this.host + environment.apiUrlGetAllNameSkills}/${id}`);
  }


  /**
   *  method for admin panel all Trainers
   * **/

  adminGetAllTrainers() {
    return this.http.get(this.host + eAdminTrainers.adminUrlGetAllTrainers);
  }

  getAllTrainersStateAdmin() {
    this.http.get(this.host + eAdminTrainers.adminUrlGetAllTrainers).subscribe((trainers) => {
      this.store.dispatch(new trainersActions.AllTrainers(trainers));
    });
  }

  /**
   *  method for admin panel one Trainers
   * **/

  adminGetOneTrainers(id: number) {
    return this.http.get(`${this.host + eAdminTrainers.adminUrlGetOneTrainers}/${id}`);
  }


  /**
   *  method for admin panel delete Trainers
   * **/

  adminDeleteTrainers(id: number) {
    return this.http.delete(`${this.host + eAdminTrainers.adminUrlDeleteTrainers}/${id}`);
  }


  /**
   *  method for admin panel create Trainers
   * **/
  adminCreateTrainers(trainings: Trainers) {
    return this.http.post(this.host + eAdminTrainers.adminUrlCreateTrainers, trainings, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   *  method for admin panel update Trainers
   * **/
  adminUpdateTrainers(trainers: Trainers, id: number) {
    return this.http.put(`${this.host + eAdminTrainers.adminUrlUpdateTrainers}/${id}`, trainers, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

