import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from '../admin/auth/model/AuthLoginInfo';
import {AuthService} from '../admin/auth/service/auth.service';
import {TokenStorageService} from '../admin/auth/service/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {

    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        // this.reloadPage();
        this.router.navigate(['admin']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
