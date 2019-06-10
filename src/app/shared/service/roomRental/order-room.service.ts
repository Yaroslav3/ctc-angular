import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminOrderRoom, environment} from '../../../../environments/environment';
import {OrderRoom} from '../../model/room/OrderRoom.model';

@Injectable({
  providedIn: 'root'
})
export class OrderRoomService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * for customer
   * create order room rental;
   * ***/
  createOrderRoom(orderRoom: OrderRoom) {
    return this.http.post(`${this.host + environment.apiUrlCreateRoomOrder}/`, orderRoom, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   * admin panel
   * Get list order room by range date;
   * **/
  adminRangeDateRoom(start: Date, end: Date, id: number) {
    return this.http.get(`${this.host + eAdminOrderRoom.adminUrlRangeDate}/${start}/${end}/${id}`);
  }

  /**
   * admin panel
   * Get one order room by id;
   * **/
  getOneOrderRoom(id: number) {
    return this.http.get(`${this.host + eAdminOrderRoom.adminUrlOneOrderRoom}/${id}`);
  }

  /**
   * admin panel
   * Delete order order room by id;
   * **/
  deleteOrderRoom(id: number) {
    return this.http.delete(`${this.host + eAdminOrderRoom.adminUrlDeleteOrderRoom}/${id}`);
  }

}
