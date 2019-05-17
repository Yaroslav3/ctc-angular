import {Component, OnInit} from '@angular/core';
import {WebinarOrderService} from '../../../../../shared/service/webinars/webinar-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WebinarOrder} from '../../../../../shared/model/webinars/WebinarOrder.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-webinar-order-details',
  templateUrl: './webinar-order-details.component.html',
  styleUrls: ['./webinar-order-details.component.scss']
})
export class WebinarOrderDetailsComponent implements OnInit {

  id: number;
  webinarOrder: WebinarOrder;
  p: number;

  constructor(private  webinarOrderService: WebinarOrderService, private idNumber: ActivatedRoute, private route: Router,
              private modalService: NgbModal, public progressService: NgProgress) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getAllWebinar(this.id);
  }


  getAllWebinar(id: number) {
    this.webinarOrderService.adminWebinarOrderGetAll(id).subscribe((data: WebinarOrder) => {
      if (Object.keys(data).length === 0) {
        console.log('empty');
        return;
      }
      this.webinarOrder = data;
      console.log(data);
    });
  }


  /**
   * open modal window delete
   * ***/
  openDeleteWindow(view) {
    this.modalService.open(view);
  }


  /**
   * delete Webinar Order
   * **/
  removeWebinarOrder(id: number) {
    this.progressService.ref().start();
    this.webinarOrderService.adminWebinarOrderDelete(id).subscribe(() => {
      this.progressService.ref().complete();
      this.getAllWebinar(this.id);
      this.modalService.dismissAll(1);
    }, error => {
      window.alert('error');
    });
  }


  /**
   *  redirect WebinarOrder
   * ***/
  onClickShow(id: number) {
    this.route.navigate(['admin', 'webinars', 'webinar-order-show', id]);
  }

}
