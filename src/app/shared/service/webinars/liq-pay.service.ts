import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminLiqPayOrder, environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiqPayService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * get one liqPay Order
   * **/
  adminGetOneOrderLiqPayService(id: number) {
    return this.http.get(`${this.host + eAdminLiqPayOrder.adminUrlGeOneLiqPayOrder}/${id}`);
  }
}
