import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/service/token-storage.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', './admin.adaptive.component.scss']
})
export class AdminComponent implements OnInit {

  info: any;

  constructor(private token: TokenStorageService) {
  }


  ngOnInit() {

    window.scroll(0, 0);
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

}
