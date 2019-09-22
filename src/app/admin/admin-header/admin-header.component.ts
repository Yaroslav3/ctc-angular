import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/service/token-storage.service';
import {Router} from '@angular/router';
import {StartService} from '../../shared/service/start.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private token: TokenStorageService,
              private router: Router,
              private startService: StartService) { }

  ngOnInit() {
    this.startService.getTrainingsAdmin();
    this.startService.getTrainersAdmin();
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['admin']);
    window.location.reload();
  }

}
