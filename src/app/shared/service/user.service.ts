import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User.model';
import {eAdminUser, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * get user for customer
   * ***/
  getAll() {
    return this.http.get(this.host + environment.apiUrlUser);
  }


  /**
   * get all user for admin panel
   * **/
  adminGetAllUser() {
    return this.http.get(this.host + eAdminUser.adminUrlUserAll);
  }

  /**
   * get one user for admin panel
   * **/
  adminGetOneUser(id: number) {
    return this.http.get(`${this.host + eAdminUser.adminUrlGetOneUser}/${id}`);
  }


  /**
   * create user for admin panel
   * **/
  adminCreateUser(user: User) {
    return this.http.post(this.host + eAdminUser.adminUrlCreateUser, user);
  }

  /**
   * delete user for admin panel
   * **/
  adminDeleteUser(id: number) {
    return this.http.delete(`${this.host + eAdminUser.adminUrlDeleteUser}/${id}`);
  }

  /**
   * update user
   * **/
  adminUpdateUser(id: number, user: User) {
    return this.http.put(`${this.host + eAdminUser.adminUrlUpdateUser}/${id}`, user);
  }
}
