import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
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
}
