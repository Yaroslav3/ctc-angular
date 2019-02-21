import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../model/Order.model';
import {eAdminOrder, environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   *  save Order
   *
   * ***/
  saveOrder(order: Order) {
    return this.http.post(this.host + environment.apiUrlTrainingsOrder, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * get all Order
   *
   * **/
  adminGetAllOrder() {
    return this.http.get(this.host + eAdminOrder.adminUrlGetAllOrder);
  }


  /**
   * delete Order on id
   * @Param id
   *
   * */
  adminDeleteOrder(id: number) {
    return this.http.delete(`${this.host + eAdminOrder.adminUrlDeleteOrder}/${id}`);
  }

  /**
   * get one Order on id
   * @Param id
   *
   * ***/
  adminGetOneOrderId(id: number) {
    return this.http.get(`${this.host + eAdminOrder.adminUrlGetOneOrder}/${id}`);
  }


  adminResponseStatusOrderReadMessage(id: number, status: boolean) {
    return this.http.post(`${this.host + eAdminOrder.adminUrlSetStatusOrder}/${id}/${status}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

