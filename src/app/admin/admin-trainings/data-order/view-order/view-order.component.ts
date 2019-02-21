import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../shared/service/order.service';
import {Order} from '../../../../shared/model/Order.model';
import {ActivatedRoute} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss', './view-order.adaptive.component.scss']
})
export class ViewOrderComponent implements OnInit {

  order: Order;
  private id: number;
  private status: boolean;

  constructor(private idNumber: ActivatedRoute, private serviceOrder: OrderService, public progressService: NgProgress) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getOneOrderAndId(this.id);
  }

  getOneOrderAndId(id: number) {
    this.progressService.ref().start();
    this.serviceOrder.adminGetOneOrderId(id).subscribe((data: Order) => {
      this.order = data;
      this.serviceOrder.adminResponseStatusOrderReadMessage(id, this.status = false).subscribe(() => {
      });
      this.progressService.ref().complete();
    });
  }


}
