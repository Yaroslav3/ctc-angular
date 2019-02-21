import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminVideo, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * show video for customer (user)
   * **/
  showVideo() {
    return this.http.get(this.host + environment.apiUrlVideo);
  }


  /**
   * get all Video
   * **/
  adminGetAllVideo() {
    return this.http.get(this.host + eAdminVideo.adminUrlGetAllVideo);
  }

  /**
   * create video for admin panel
   * **/
  adminCreateVideo(fd: FormData) {
    return this.http.post(this.host + eAdminVideo.adminUrlCreateVideo, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * update video
   * **/
  adminUpdateVideo(id: number, fd: FormData) {
    return this.http.put(`${this.host + eAdminVideo.adminUrlUpdateVideo}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }


  /**
   * delete video
   * **/
  adminDeleteVideo(id: number) {
    return this.http.delete(`${this.host + eAdminVideo.adminUrlDeleteVideo}/${id}`);
  }
}
