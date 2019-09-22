import {Component, OnInit, TemplateRef} from '@angular/core';
import {OrderService} from '../../../shared/service/order.service';
import {Order} from '../../../shared/model/Order.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-data-order',
  templateUrl: './data-order.component.html',
  styleUrls: ['./data-order.component.scss', './data-order.adaptive.component.scss']
})
export class DataOrderComponent implements OnInit {

  order: Order;
  status: boolean;

  modalRef: BsModalRef;
  message: string;

  boolPagination = false;
  p: any;

  constructor(private orderService: OrderService,
              private modalService: BsModalService,
              private router: Router,
              public progressService: NgProgress) {
  }

  ngOnInit() {
    this.getAllOrder();
    window.scroll(0, 0);
  }

  getAllOrder() {
    this.progressService.ref().start();
    this.orderService.adminGetAllOrder().subscribe((data: Order) => {
      this.order = data;

      if (Object.keys(data).length >= 8) {
        this.boolPagination = true;
      }
      this.progressService.ref().complete();
    });
  }


  /**
   * modal view for delete Order
   *
   * **/
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: number) {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.orderService.adminDeleteOrder(id).subscribe(() => {
        this.getAllOrder();
      }
    );
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  /***
   *  view Order
   *
   * **/
  onClickView(order: Order) {
    this.router.navigate(['admin', 'trainings', 'view-order', order.id]);
  }

}
