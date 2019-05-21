import {Component, OnInit, Pipe} from '@angular/core';
import {TransferRoomOrderService} from '../../shared/service/share/transfer/transfer-room-order.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransferRoomService} from '../../shared/service/share/transfer/transfer-room.service';
import {TransferDatePeriodService} from '../../shared/service/share/transfer/transfer-date-period.service';
import {OrderRoomService} from '../../shared/service/roomRental/order-room.service';
import {OrderRoom} from '../../shared/model/room/OrderRoom.model';
import {RoomDateService} from '../../shared/service/roomRental/room-date.service';

@Component({
  selector: 'app-order-room',
  templateUrl: './order-room.component.html',
  styleUrls: ['./order-room.component.scss']
})

@Pipe({
  name: 'formatDate'
})
export class OrderRoomComponent implements OnInit {

  id: number;
  arrayOrder = this.transferRoomOrderService.getData();
  room = this.transferRoomService.getData();
  datePeriod = this.transferDatePeriodService.getData();


  date: Date;
  isDateTimeRoom: boolean;
  isDatePeriodRoom: boolean;
  numOrder: number;
  countDay: number;
  orderTime: any = [];



  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  constructor(
    private idNumber: ActivatedRoute,
    private transferRoomOrderService: TransferRoomOrderService,
    private transferRoomService: TransferRoomService,
    private transferDatePeriodService: TransferDatePeriodService,
    private fb: FormBuilder,
    private orderRoomService: OrderRoomService,
    private roomDateService: RoomDateService
  ) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.showDateTime();
    this.createFormGroup();

  }


  showDateTime() {
    if (this.arrayOrder.length !== 0) {
      this.date = this.arrayOrder[0].startDate;
      this.isDateTimeRoom = true;
      this.numOrder = this.arrayOrder.length;
    } else {
      if (this.datePeriod !== undefined) {
        this.isDatePeriodRoom = true;
        console.log('period');
        this.countDay = (this.datePeriod.endDate.getDay() + 1) - this.datePeriod.startDate.getDay();
      } else {
        console.log('redirect');
      }
    }
  }

  /***
   *  Form Group for validation
   * **/
  createFormGroup() {
    return this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(7)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.formGroup.controls;
  }

  /**
   *  reset
   * **/

  revert() {
    this.formGroup.reset();
  }


  saveOrder() {
    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }
  }


  /**
   * Create room  order  and redirect yo liqPay;
   * ***/
  createRoomPrice() {

    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const order = new OrderRoom();
    order.nameSurname = this.f.name.value;
    order.email = this.f.email.value;
    order.phone = this.f.phone.value;
    order.description = this.f.description.value;

    /**
     * if arrayOrder not empty;
     * ***/
    if (this.arrayOrder.length !== 0) {
      this.saveTimeOrderServer(order);
    } else if (this.datePeriod !== undefined) {
      console.log('tesstststst');
      this.createPeriodDateTime(order);
    }
  }


  /**
   * create order room time by one day;
   * ***/
  private saveTimeOrderServer(order) {
    this.orderRoomService.createOrderRoom(order).subscribe((date: OrderRoom) => {
      if (date !== null) {
        for (let i = 0; i < Object.keys(this.arrayOrder).length; i++) {
          this.orderTime = Object.keys(this.arrayOrder).map(key =>
            ({
              roomRentalId: this.id,
              orderRoomId: date.id,
              startDate: new Date(this.arrayOrder[key].startDate + 'Z'),
              endDate: new Date(this.arrayOrder[key].endDate + 'Z')
            }));
        }
        console.log(this.orderTime);
        this.roomDateService.createTimeOrderRoom(this.orderTime).subscribe(data => {
          console.log(data);
        });
      }
    });
  }


  /**
   * create order room time by many day;
   * ***/
  private createPeriodDateTime(order) {
    const map1 = new Map<Date, Date>();
    const resultArray = [];
    this.datePeriod.startDate.setHours(10);
    this.datePeriod.startDate.setMinutes(0);
    for (let i = 0; i < this.countDay; i++) {
      for (let e = 0; e < 9; e++) {

        const test = new Date();
        const test2 = new Date();
        test.setFullYear(this.datePeriod.startDate.getFullYear());
        test.setDate(this.datePeriod.startDate.getDate() + i);
        test.setHours(10 + e);
        test.setMinutes(0);
        test.setSeconds(0);
        test2.setFullYear(this.datePeriod.startDate.getFullYear());
        test2.setDate(this.datePeriod.startDate.getDate() + i);
        test2.setHours((10 + 1) + e);
        test2.setMinutes(0);
        test2.setSeconds(0);

        map1.set(test, test2);
      }
    }
    this.orderRoomService.createOrderRoom(order).subscribe((date: OrderRoom) => {
      console.log(date);
      if (date !== null) {
        map1.forEach((val, key) => {
          resultArray.push({
            roomRentalId: this.id,
            orderRoomId: date.id,
            startDate: new Date(key + 'Z'),
            endDate: new Date(val + 'Z')
          });
        });
        this.roomDateService.createTimeOrderRoom(resultArray).subscribe(data => {
          console.log(data);
        });
      }

      console.log(resultArray);
    });
  }
}
