import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Trainings} from '../../model/trainings/Trainings.model';
import {eAdminTrainings, environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromRoot from 'src/app/common/index';
import * as trainingsActions from '../../../common/trainings/trainings.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  private readonly host: string;

  constructor(private http: HttpClient,
              private store: Store<fromRoot.AppState>) {
    this.host = environment.host;
  }

  getAllTrainings() {
    return this.http.get(this.host + environment.apiUrlTrainings);
  }

  getAllTrainingsState() {
    this.http.get(this.host + environment.apiUrlTrainings)
      .subscribe(res =>
        this.store.dispatch(new trainingsActions.AllTrainings(res)));
  }


  /**
   * get one Trainings
   * **/
  getOneTrainings(id: number) {
    return this.http.get(`${ this.host + environment.apiUrlTrainingsGetOne}/${id}`, {
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
      briefly: trainings.briefly
    };

    return this.http.put<Trainings>(`${this.host +  eAdminTrainings.adminUrlUpdateTrainings}/${id}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

