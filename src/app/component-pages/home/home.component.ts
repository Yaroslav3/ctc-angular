import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  constructor(
    private store: Store<fromRoot.AppState>,
  ) {
  }


  ngOnInit() {
    window.scroll(0, 0);
    this.store.select('trainers').subscribe( r => {
      console.log(r);
    });

  }

}
