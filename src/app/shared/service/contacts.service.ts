import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eContacts, environment} from '../../../environments/environment';
import {Contacts} from '../model/Contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /***
   *  get All Contacts
   * ***/
  adminGetAllContacts() {
    return this.http.get(this.host + eContacts.adminUrlGetAllContacts);
  }

  /***
   *  get One Contacts
   * ***/
  adminGetOneContacts(id: number) {
    return this.http.get(`${this.host + eContacts.adminUrlGetOneContacts}/${id}`);
  }

  /***
   *  get Create Contacts
   * ***/
  adminCreateContacts(contacts: Contacts) {
    return this.http.post(`${this.host + eContacts.adminUrlCreateContacts}`, contacts, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /***
   *  get delete Contacts
   * ***/
  adminDeleteContacts(id: number) {
    return this.http.delete(`${this.host + eContacts.adminUrlDeleteContacts}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   *  method for admin panel update Contacts
   * **/
  adminUpdateContacts(contacts: Contacts) {
    return this.http.put(`${this.host + eContacts.adminUrlUpdateContacts}`, contacts, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
