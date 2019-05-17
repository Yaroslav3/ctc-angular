import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminPhotoWebinars, environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoWebinarsService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * get photo Webinar
   * ***/
  adminGetPhotoWebinars(id: number) {
    return this.http.get(`${this.host + eAdminPhotoWebinars.adminUrlGetOnePhotoWebinars}/${id}`,
      {responseType: 'blob'});
  }

  /**
   *  check exist photo
   * ***/
  adminPhotoWebinarsCheck(id: number) {
    return this.http.get(`${this.host + eAdminPhotoWebinars.adminUrlCheckPhotoWebinars}/${id}`);
  }


  /**
   * create Photo Webinars
   * **/
  adminCreatePhotoWebinars(fd: FormData, id) {
    return this.http.post(`${this.host + eAdminPhotoWebinars.adminUrlCreatePhotoWebinars}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }



  /**
   *
   * update photo Photo Webinars
   * **/
  adminUrlUpdatePhotoWebinars(fd: FormData, id) {
    return this.http.post(`${this.host + eAdminPhotoWebinars.adminUrlUpdatePhotoWebinars}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
