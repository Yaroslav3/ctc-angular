import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminFirstPhotoBlog, environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstPhotoBlogService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * get one photo Photo Blog;
   * (admin panel)
   * **/
  adminGetOnePhotoBlog(id: number) {
    return this.http.get(`${this.host + eAdminFirstPhotoBlog.adminUrlPhotoGetOne}/${id}`, {responseType: 'blob'});
  }

  /**
   * check if eexist photo Photo Blog;
   * (admin panel)
   * **/
  adminGetCheckPhotoBlog(id: number) {
    return this.http.get(`${this.host + eAdminFirstPhotoBlog.adminUrlPhotoCheck}/${id}`);
  }


  /**
   *  create Photo Blog;
   *  (admin panel)
   * **/
  adminCreatePhotoBlog(fd: FormData, id) {
    return this.http.post(`${this.host + eAdminFirstPhotoBlog.adminUrlPhotoCreate}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   *  update Photo Blog;
   *  (admin panel)
   * **/
  adminUpdatePhotoBlog(fd: FormData, id) {
    return this.http.post(`${this.host + eAdminFirstPhotoBlog.adminUrlPhotoUpdate}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
