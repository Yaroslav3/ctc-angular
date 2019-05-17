import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminWebinars, environment} from '../../../../environments/environment';
import {Webinars} from '../../model/webinars/Webinars.model';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class WebinarsService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * liqPay invoice
   * **/
  liqPayInvoiceWebinar(id: number) {
    return this.http.get(`${this.host + environment.apiUrlInvoiceLiqPayWebinars}/${id}`);

  }

  /**
   * get all Webinars (customer)
   * **/

  getAll() {
    return this.http.get(this.host + environment.apiUrlWebinars);
  }


  /**
   * get one Webinars (customer)
   * **/

  getOne(id: number) {
    return this.http.get(`${this.host + environment.apiUrlWebinarsGetOne}/${id}`);
  }


  /**
   * get all Webinars
   * **/
  adminGetAllWebinars() {
    return this.http.get(this.host + eAdminWebinars.adminUrlGetAllWebinars);
  }


  /**
   * get one Webinars
   * **/
  adminGetOneWebinars(id) {
    return this.http.get(`${this.host + eAdminWebinars.adminUrlGetOneWebinars}/${id}`);
  }

  /**
   * create Webinars
   * **/
  adminCreateWebinars(webinars: Webinars) {
    return this.http.post(this.host + eAdminWebinars.adminUrlCreateWebinars, webinars);
  }

  /**
   *  update Webinars
   * **/
  adminUpdateWebinars(id, webinars: Webinars) {
    return this.http.put(`${this.host + eAdminWebinars.adminUrlUpdateWebinars}/${id}`, webinars);
  }

  /**
   *  delete Webinars
   * **/
  adminDeleteWebinars(id) {
    return this.http.delete(`${this.host + eAdminWebinars.adminUrlDeleteWebinars}/${id}`);
  }

}
