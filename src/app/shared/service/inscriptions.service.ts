import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inscriptions} from '../model/Inscriptions.model';
import {eAdminInscriptions, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   *  get all Inscriptions
   * **/
  getAllInscriptions() {
    return this.http.get(this.host + environment.apiUrlTrainingsInscriptions);
  }

  /**
   *  get all Inscriptions
   *  (admin panel)
   * **/

  getAll() {
    return this.http.get(this.host + eAdminInscriptions.adminUrlGetAllInscriptions);
  }


  /**
   *  get One Inscriptions
   *  (admin panel)
   * **/

  getOne(id: number) {
    return this.http.get(`${this.host + eAdminInscriptions.adminUrlGetOneInscriptions}/${id}`);
  }


  /**
   *  delete Inscriptions
   *  (admin panel)
   * **/

  deleteInscriptions(id: number) {
    return this.http.delete(`${this.host + eAdminInscriptions.adminUrlDeleteInscriptions}/${id}`);
  }


  /**
   * create Inscriptions
   * (admin panel)
   * **/

  createInscriptions(inscriptions: Inscriptions) {
    return this.http.post(`${this.host + eAdminInscriptions.adminUrlCreateInscriptions}`, inscriptions,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  /**
   * update Inscriptions
   * (admin panel)
   * **/

  updateInscriptions(inscriptions: Inscriptions, id: number) {
    const body = {
      paragraph: inscriptions.paragraph,
      description: inscriptions.description
    };

    return this.http.put(`${this.host + eAdminInscriptions.adminUrlUpdateInscriptions}/${id}`, body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }
}
