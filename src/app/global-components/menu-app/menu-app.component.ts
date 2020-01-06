import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.scss']
})
export class MenuAppComponent implements OnInit {
  burgerMenu: boolean;

  constructor() {
    this.burgerMenu = true;
  }

  ngOnInit() {
  }

  burger() {
    window.scroll(0, 0);
    this.burgerMenu = true;
  }

  /**
   *  burger hidden (mobile version)
   * ***/
  burgerHidden() {
    this.burgerMenu = false;
  }

}
