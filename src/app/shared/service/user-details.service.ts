import {Injectable} from '@angular/core';
import {eAdminUserDetails, environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   *  show user details
   * ***/
  getUserDetails() {
    return this.http.get(`${this.host + eAdminUserDetails.adminUrlUserService}`);
  }
}
