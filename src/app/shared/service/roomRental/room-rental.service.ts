import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminRoomRental, environment} from '../../../../environments/environment';
import {Room} from '../../model/room/Room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomRentalService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * for customer
   * get all room;
   * **/
  getAllRoom() {
    return this.http.get<any>(this.host + environment.apiUrlRoomAll);
  }

  /**
   * for customer
   * get one room;
   * ***/
  getOneRoom(id: number) {
    return this.http.get<any>(`${this.host + environment.apiUrlRoomOne}/${id}`);
  }

  /**
   * admin panel:
   * get all room;
   * **/
  adminRoomRentalAll() {
    return this.http.get(`${this.host + eAdminRoomRental.adminUrlGetAll}`);
  }

  /**
   * admin panel:
   * get one room
   * **/
  adminOneRoom(id: number) {
    return this.http.get(`${this.host + eAdminRoomRental.adminUrlGetOne}/${id}`);
  }


  /**
   * admin panel
   * remove room by @id
   * **/
  adminRoomRemove(id: number) {
    return this.http.delete(`${this.host + eAdminRoomRental.adminUrlRemove}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * admin panel
   * create room;
   * ***/
  adminCreateRoom(room: Room) {
    return this.http.post(`${this.host + eAdminRoomRental.adminUrlCreate}`, room, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * admin panel
   * update room;
   * ***/
  adminUpdateRoom(room: Room) {
    return this.http.put(`${this.host + eAdminRoomRental.adminUrlUpdate}`, room, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
