import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebinarOrderService} from '../../../../shared/service/webinars/webinar-order.service';
import {Status} from '../../../../shared/model/status/Status.model';

@Component({
  selector: 'app-order-succed',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  id: number;

  messageStatus: string;

  constructor(private route: Router, private idNumber: ActivatedRoute,
              private serviceWebinarOrder: WebinarOrderService) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.status(this.id);
  }


  /**
   *  click back
   * **/
  back() {
    this.route.navigate(['webinars']);
  }

  /**
   *  status LoqPay
   * **/
  status(id: number) {
    this.serviceWebinarOrder.statusLiqPay(id).subscribe((data: Status) => {
      this.messageStatus = data.message;
    });
  }


}
