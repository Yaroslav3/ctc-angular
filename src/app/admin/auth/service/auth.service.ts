import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from '../model/AuthLoginInfo';
import {eAdminAuth, environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {JwtResponse} from '../model/JwtResponse';
import {SignUpInfo} from '../model/SignUpInfo';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirectUrl = '/';
  private loginURL = '/login';
  private isLoggedIn = false;
  private loggedInUser: AuthLoginInfo;


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>( this.host + eAdminAuth.adminUrlSignin, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>( this.host + eAdminAuth.adminUrlSignup, info, httpOptions);
  }


  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getLoginUrl(): string {
    return this.loginURL;
  }

  getLoggedInUser(): AuthLoginInfo {
    return this.loggedInUser;
  }

  logoutUser(): void {
    this.isLoggedIn = false;
  }

}

