import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminRoomPrise, environment} from '../../../../environments/environment';
import {RoomPrice} from '../../model/room/RoomPrice.model';

@Injectable({
  providedIn: 'root'
})
export class RoomPriseService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * admin panel
   * get one room prise
   * ***/
  adminGetOnePriceRoom(id: number) {
    return this.http.get(`${this.host + eAdminRoomPrise.adminUrlGetOne}/${id}`);
  }

  /**
   * admin panel:
   * check status by id room rental
   * **/
  adminCheck(id: number) {
    return this.http.get(`${this.host + eAdminRoomPrise.adminUrlStatus}/${id}`);
  }

  /**
   * admin panel
   * create room prise
   * ***/
  adminCreatePrise(id: number, prise: RoomPrice) {
    return this.http.post(`${this.host + eAdminRoomPrise.adminUrlCreate}/${id}`, prise, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   * admin panel
   * update room prise
   * ***/
  adminUpdatePrice(id: number, prise: RoomPrice) {
    return this.http.put(`${this.host + eAdminRoomPrise.adminUrlUpdate}/${id}`, prise, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
