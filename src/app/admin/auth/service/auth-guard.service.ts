import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  canLoad(route: Route): boolean {
    const token = this.tokenStorage.getToken();

    if (token == null) {
      this.router.navigate([this.authService.getLoginUrl()]);
    } else {
      return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenStorage.getToken();

    if (token == null) {

      console.log('_____________AlwaysAuthGuard____________');
      return false;
    }

    return true;
  }
}

