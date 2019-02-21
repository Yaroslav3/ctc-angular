import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Trainings} from '../model/Trainings.model';
import {eAdminTrainings, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  getAllTrainings() {
    return this.http.get( this.host + environment.apiUrlTrainings);
  }

  getOneTrainings(id: number) {
    return this.http.get(`${ this.host + environment.apiUrlTrainersGetOne}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   *  method for admin panel one Trainings
   * **/

  adminGetOneTrainings(id: number) {
    return this.http.get(`${ this.host + eAdminTrainings.adminUrlGetOneTrainings}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   *  method for admin panel all Trainings
   * **/

  adminGetAllTrainings() {
    return this.http.get( this.host + eAdminTrainings.adminUrlGetAllTrainings);
  }

  /**
   *  method for admin panel delete Trainings
   * **/

  adminDeleteTrainings(id: number) {
    return this.http.delete(`${ this.host + eAdminTrainings.adminUrlDeleteTrainings}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   *  method for admin panel create Trainings
   * **/

  adminCreateTrainings(trainings: Trainings): Observable<Trainings> {
    return this.http.post<Trainings>(this.host + eAdminTrainings.adminUrlUCreateTrainings, trainings, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   *  method for admin panel update Trainings
   * **/

  adminUpdateTrainings(trainings: Trainings, id: number): Observable<Trainings> {
    const body = {
      name: trainings.name,
      description: trainings.description
    };

    return this.http.put<Trainings>(`${this.host +  eAdminTrainings.adminUrlUpdateTrainings}/${id}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

