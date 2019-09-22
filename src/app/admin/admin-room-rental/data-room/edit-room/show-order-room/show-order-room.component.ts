import {Component, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderRoomService} from '../../../../../shared/service/roomRental/order-room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {OrderRoom} from '../../../../../shared/model/room/OrderRoom.model';
import {Status} from '../../../../../shared/model/status/Status.model';

@Component({
  selector: 'app-show-order-room',
  templateUrl: './show-order-room.component.html',
  styleUrls: ['./show-order-room.component.scss']
})
export class ShowOrderRoomComponent implements OnInit {

  orderModel: OrderRoom;

  id: number;
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  p: any;
  boolPagination: boolean;

  constructor(private idNumber: ActivatedRoute,
              private calendar: NgbCalendar,
              private orderRoomService: OrderRoomService,
              private modalService: NgbModal,
              private router: Router) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });

    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;

    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if ((this.fromDate != null) && (this.toDate != null)) {
      this.getRangeDate(this.dateTransformStart(), this.dateTransformEnd(), this.id);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getRangeDate(this.dateTransformStart(), this.dateTransformEnd(), this.id);
  }


  /**
   * Show order date;
   * **/
  getRangeDate(start, end, id) {
    this.orderRoomService.adminRangeDateRoom(start, end, id).subscribe((date: OrderRoom) => {
      this.orderModel = date;
      console.log(this.orderModel);
    });
  }

  /**
   * Delete order room;
   * **/
  deleteOrder(id: number) {
    this.orderRoomService.deleteOrderRoom(id).subscribe((data: Status) => {
      if (data.message === 'remove') {
        this.getRangeDate(this.dateTransformStart(), this.dateTransformEnd(), this.id);
      } else {
        window.alert('error');
      }

    });
  }


  /**
   * transform start date ;
   * **/
  private dateTransformStart() {
    const start = new Date();
    start.setFullYear(this.fromDate.year);
    start.setDate(this.fromDate.day);
    start.setMonth(this.fromDate.month - 1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(start, 'yyyy-MM-dd HH:mm');
  }

  /**
   * transform end date ;
   * **/
  private dateTransformEnd() {
    const end = new Date();
    end.setFullYear(this.toDate.year);
    end.setDate(this.toDate.day);
    end.setMonth(this.toDate.month - 1);
    end.setHours(23);
    end.setMinutes(0);
    end.setSeconds(0);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(end, 'yyyy-MM-dd HH:mm');
  }

  openModal(view) {
    this.modalService.open(view);
  }

  /**
   * After enter button will be delete order room;
   * **/
  deleteOrderRoom(elem) {
    this.deleteOrder(elem.id);
    this.modalService.dismissAll(1);
  }


  /**
   * Redirect to order room detail page;
   * ***/
  onClickOpenOrder(elem: OrderRoom) {
    this.router.navigate(['admin', 'room', 'rental', 'show-order-room-one', elem.id]);
  }
}
