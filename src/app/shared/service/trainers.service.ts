import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Trainers} from '../model/Trainers.model';
import {eAdminTrainers, environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  getAllTrainers() {
    return this.http.get(this.host + environment.apiUrlTrainers);
  }

  getOneTrainers(id: number) {
    return this.http.get(`${this.host + environment.apiUrlTrainersGetOne}/${id}`);
  }


  /**
   *  method for admin panel all Trainers
   * **/

  adminGetAllTrainers() {
    return this.http.get(this.host + eAdminTrainers.adminUrlGetAllTrainers);
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

