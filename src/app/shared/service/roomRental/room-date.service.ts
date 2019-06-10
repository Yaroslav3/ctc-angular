import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomDateService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * for customer
   * save time order;
   * ***/
  createTimeOrderRoom(roomTime = []) {
    return this.http.post(`${this.host + environment.apiUrlSaveTimeRoom}`, roomTime, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * for customer
   * get all time on one day
   * ***/
  timeOneDayRoom(startDay: string, endDay: string, id: number) {
    return this.http.get(`${this.host + environment.apiUrlRoomDayTimeOrder}/${startDay}/${endDay}/${id}`);
  }


  /**
   * for customer
   * Choice time on many day;
   * ***/
  periodDayRoom(startDay: string, endDay: string, id: number) {
    return this.http.get(`${this.host + environment.apiUrlRoomPeriodDayOrder}/${startDay}/${endDay}/${id}`);
  }

  /**
   * for customer
   * method  for checked, time is exist or not exist;
   * ****/
  checkedTimeRoom(roomTime = [], id: number) {
    return this.http.post(`${this.host + environment.apiUrlCheckedTimeRoom}/${id}`, roomTime, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
