import {Injectable} from '@angular/core';
import {eAdminWebinarOrder, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {WebinarOrder} from '../../model/webinars/WebinarOrder.model';

@Injectable({
  providedIn: 'root'
})
export class WebinarOrderService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * get one Webinar Order
   * **/
  adminWebinarsOrderGetOne(id: number) {
    return this.http.get(`${this.host + eAdminWebinarOrder.adminUrlGeOneOrder}/${id}`);
  }


  /**
   *  create Webinar Order
   * **/
  createWebinarOrder(webinarOrder: WebinarOrder) {
    return this.http.post(this.host + environment.apiUrlCreateWebinarOrder, webinarOrder);
  }

  /**
   *  status order LiqPay
   * ***/
  statusLiqPay(id: number) {
    return this.http.get(`${this.host + environment.apiUrlWebinarOrderStatus}/${id}`);
  }


  /**
   *  get all Webinar Order
   *  (admin panel)
   * ***/
  adminWebinarOrderGetAll(id: number) {
    return this.http.get(`${this.host + eAdminWebinarOrder.adminUrlGetAll}/${id}`);
  }

  /**
   *  delete Webinar Order
   *  (admin panel)
   * ***/
  adminWebinarOrderDelete(id: number) {
    return this.http.delete(`${this.host + eAdminWebinarOrder.adminUrlDelete}/${id}`);
  }

}
