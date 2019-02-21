import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminAccountService, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   *   change password in admin panel
   * **/
  changePassword(passwordOld: string, password: string) {
    return this.http.put(`${this.host + eAdminAccountService.adminUrlChangePassword}/${passwordOld}/${password}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   *  get all users role accounts
   * **/
  adminUrlGetAllUserAdmin() {
    return this.http.get(this.host + eAdminAccountService.adminUrlGetAllUserAdmin);
  }


  /***
   *  delete user account
   * **/
  adminUrlDeleteUser(id: number) {
    return this.http.delete(`${this.host + eAdminAccountService.adminUrlDeleteUser}/${id}`);
  }
}

