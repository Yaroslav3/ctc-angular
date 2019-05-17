import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminWebinarInscriptions, environment} from '../../../../environments/environment';
import {WebinarInscription} from '../../model/webinars/WebinarInscription.model';

@Injectable({
  providedIn: 'root'
})
export class WebinarsInscriptionsService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   *  get all WebinarsInscriptions
   * **/

  getAll() {
    return this.http.get(this.host + environment.apiUrlWebinarsInscription);
  }


  /**
   *  get all WebinarsInscriptions
   *  (admin panel)
   * **/

  getAllInscriptions() {
    return this.http.get(this.host + eAdminWebinarInscriptions.adminUrlGetAllWebinarInscriptions);
  }


  /**
   *  get One WebinarsInscriptions
   *  (admin panel)
   * **/

  getOneInscriptions(id) {
    return this.http.get(`${this.host + eAdminWebinarInscriptions.adminUrlGetOneWebinarInscriptions}/${id}`);
  }


  /**
   *  delete WebinarsInscriptions
   *  (admin panel)
   * **/

  deleteInscriptions(id) {
    return this.http.delete(`${this.host + eAdminWebinarInscriptions.adminUrlDeleteWebinarInscriptions}/${id}`);
  }


  /**
   * create WebinarInscription
   * (admin panel)
   * **/

  createInscriptions(webinarInscription: WebinarInscription) {
    return this.http.post(`${this.host + eAdminWebinarInscriptions.adminUrlCreateWebinarInscriptions}`,
      webinarInscription,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  /**
   * update WebinarInscription
   * (admin panel)
   * **/

  updateInscriptions(webinarInscription: WebinarInscription, id) {
    const body = {
      paragraph: webinarInscription.paragraph,
      description: webinarInscription.description
    };

    return this.http.put(`${this.host + eAdminWebinarInscriptions.adminUrlUpdateWebinarInscriptions}/${id}`, body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }
}
