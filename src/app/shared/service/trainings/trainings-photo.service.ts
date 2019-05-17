import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminPhotoTrainings, environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingsPhotoService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * get TrainingsPhoto
   * ***/
  adminGetTrainingsPhoto(id: number) {
    return this.http.get(`${this.host +
    eAdminPhotoTrainings.adminUrlGetOneTrainingsPhoto}/${id}`, {responseType: 'blob'});
  }

  /**
   * create TrainingsPhoto
   * **/
  adminCreateTrainingsPhoto(fd: FormData, id: number) {
    return this.http.post(`${this.host + eAdminPhotoTrainings.adminUrlCreateTrainingsPhoto}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }


  /**
   *
   * update TrainingsPhoto
   * **/
  adminUrlUpdateTrainingsPhoto(fd: FormData, id: number) {
    return this.http.post(`${this.host + eAdminPhotoTrainings.adminUrlUpdateTrainingsPhoto}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
