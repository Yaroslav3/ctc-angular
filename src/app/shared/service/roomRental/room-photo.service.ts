import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminRoomPhoto, environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomPhotoService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * for customer
   * get all photo;
   * **/
  allPhotoRoom(id: number) {
    return this.http.get(`${this.host + environment.apiUrlRoomAllPhoto}/${id}`);
  }

  /**
   * admin panel
   * getAll photo room;
   * **/
  adminFetAllPhoto(id: number) {
    return this.http.get(`${this.host + eAdminRoomPhoto.adminUplGetAll}/${id}`);
  }

  /**
   * admin panel
   * create room photo;
   * ***/
  adminCreatePhoto(fd: FormData, id: number) {
    return this.http.post(`${this.host + eAdminRoomPhoto.adminUplCreate}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }


  /**
   * admin panel
   * update room photo;
   * ***/
  adminUpdatePhoto(fd: FormData, id: number) {
    return this.http.post(`${this.host + eAdminRoomPhoto.adminUplUpdate}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * admin panel
   * delete photo room;
   * **/
  adminDeletePhoto(id: number) {
    return this.http.delete(`${this.host + eAdminRoomPhoto.adminUplDelete}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
