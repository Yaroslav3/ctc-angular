import {Component, OnInit} from '@angular/core';
import {WebinarOrderService} from '../../../../../../shared/service/webinars/webinar-order.service';
import {ActivatedRoute} from '@angular/router';
import {WebinarOrder} from '../../../../../../shared/model/webinars/WebinarOrder.model';
import {LiqPayService} from '../../../../../../shared/service/webinars/liq-pay.service';
import {LiqPayResponse} from '../../../../../../shared/model/webinars/LiqPayResponse.model';

@Component({
  selector: 'app-webinar-order-show',
  templateUrl: './webinar-order-show.component.html',
  styleUrls: ['./webinar-order-show.component.scss']
})
export class WebinarOrderShowComponent implements OnInit {

  id: number;
  webinarOrder: WebinarOrder;
  liqPayResponse: LiqPayResponse;

  constructor(private  webinarOrderService: WebinarOrderService, private idNumber: ActivatedRoute,
              private liqPayService: LiqPayService) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getOneWebinar(this.id);
    this.getOneLiqPayOrder(this.id);
  }

  getOneWebinar(id: number) {
    this.webinarOrderService.adminWebinarsOrderGetOne(id).subscribe((date: WebinarOrder) => {
      console.log(date);
      this.webinarOrder = date;
    });
  }

  getOneLiqPayOrder(id: number) {
    this.liqPayService.adminGetOneOrderLiqPayService(id).subscribe((data: LiqPayResponse) => {
      console.log(data);
      this.liqPayResponse = data;
    });
  }


}
