import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminTrainers, environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * get photo method
   * ***/
  adminGetTrainerPhoto(id: number) {
    return this.http.get(`${this.host + eAdminTrainers.adminUrlTrainersGetPhoto}/${id}`, {responseType: 'blob'});
  }


  /**
   * create photo method
   * **/
  adminCreateTrainersPhoto(fd: FormData, id: number) {
    return this.http.post(`${this.host + eAdminTrainers.adminUrlTrainersCreatePhoto}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }


  /**
   *
   * update photo Trainer method
   * **/
  adminUrlTrainersUpdatePhoto(fd: FormData, id: number) {
    return this.http.post(`${this.host + eAdminTrainers.adminUrlTrainersUpdatePhoto}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
