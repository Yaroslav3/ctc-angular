import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../shared/service/order.service';

@Component({
  selector: 'app-admin-trainings',
  templateUrl: './admin-trainings.component.html',
  styleUrls: ['./admin-trainings.component.scss', './admin-trainings.adaptive.component.scss']
})

export class AdminTrainingsComponent implements OnInit {
  countOrder: number;


  constructor(private orderService: OrderService) {

  }


  ngOnInit() {
    this.getCountMessage();
  }

  getCountMessage() {
    this.orderService.adminGetAllOrder().subscribe(data => {
      let count = 0;
      for (let i = 0; i < Object.keys(data).length; i++) {
        const a = data[i];
        if (a.status === true) {
          this.countOrder = ++count;
        }
      }
    });
  }

}
