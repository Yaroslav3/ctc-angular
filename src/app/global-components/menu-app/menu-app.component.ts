import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.scss']
})
export class MenuAppComponent implements OnInit {
  burgerMenu: boolean;

  constructor() {

  }

  ngOnInit() {
    this.burgerMenu = false;
  }

  public burger() {
    window.scroll(0, 0);
    this.burgerMenu = this.burgerMenu ? false : true;
    if (this.burgerMenu === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

  }


 public burgerHidden() {
    this.burgerMenu = false;
    document.body.style.overflow = 'visible';
  }
}
