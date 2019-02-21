import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/service/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['admin']);
    window.location.reload();
  }

}
