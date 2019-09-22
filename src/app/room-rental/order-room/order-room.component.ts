import {Component, OnInit, Pipe} from '@angular/core';
import {TransferRoomOrderService} from '../../shared/service/share/transfer/transfer-room-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransferRoomService} from '../../shared/service/share/transfer/transfer-room.service';
import {TransferDatePeriodService} from '../../shared/service/share/transfer/transfer-date-period.service';
import {OrderRoomService} from '../../shared/service/roomRental/order-room.service';
import {OrderRoom} from '../../shared/model/room/OrderRoom.model';
import {RoomDateService} from '../../shared/service/roomRental/room-date.service';
import {Status} from '../../shared/model/status/Status.model';
import * as moment from 'moment';

@Component({
  selector: 'app-order-room',
  templateUrl: './order-room.component.html',
  styleUrls: ['./order-room.component.scss', './order-room.admin.component.scss']
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
  isLiqPay = false;
  isInputInf = true;
  numOrder: number;
  countDay: number;
  orderTime: any = [];
  resultArray = [];
  map1 = new Map<Date, Date>();

  // for check
  map2 = new Map<Date, Date>();
  isMassage = false;


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
    private roomDateService: RoomDateService,
    private router: Router
  ) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.showDateTime();
    this.createFormGroup();
    console.log(this.datePeriod);
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
        const start = moment(this.datePeriod.startDate);
        const end = moment(this.datePeriod.endDate);
        this.countDay = (end.diff(start, 'days') + 1);

      } else {
        console.log('redirect');
        this.router.navigate(['room-rental']);
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


  // saveOrder() {
  //   this.isSubmitted = true;
  //
  //   if (this.formGroup.invalid) {
  //     return;
  //   }
  // }


  /**
   * Create room  order  and redirect yo liqPay;
   * ***/
  createRoomPrice() {

    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    /**
     * if arrayOrder not empty;
     * ***/
    if (this.arrayOrder.length !== 0) {
      this.isInputInf = false;
    } else if (this.datePeriod !== undefined) {
      console.log('many');
      this.isInputInf = false;
    }
  }


  /**
   * method  for checked, time is exist or not exist;
   * ****/
  private checkTimeRoom(order: OrderRoom) {
    for (let i = 0; i < Object.keys(this.arrayOrder).length; i++) {
      this.orderTime = Object.keys(this.arrayOrder).map(key =>
        ({
          roomRentalId: this.id,
          startDate: new Date(this.arrayOrder[key].startDate + 'Z'),
          endDate: new Date(this.arrayOrder[key].endDate + 'Z')
        }));
    }
    this.roomDateService.checkedTimeRoom(this.orderTime, this.id).subscribe((data: Status) => {
      if (data.message === 'no exist') {
        console.log(data);
        this.saveTimeOrderServer(order);
      } else if (data.message === 'exist') {
        this.isMassage = true;
        console.log(data);
      }
    });
  }

  /**
   * method  for checked, time is exist or not exist, for many date time room ;
   * ****/
  private checkManyDateTimeRoom(order: OrderRoom) {
    this.resultArray = [];
    console.log('countDay');
    console.log(this.countDay);
    // this.datePeriod.startDate.setHours(10);
    // this.datePeriod.startDate.setMinutes(0);
    for (let i = 0; i < this.countDay; i++) {
      for (let e = 0; e < 9; e++) {

        const start = new Date();
        const end = new Date();
        start.setFullYear(this.datePeriod.startDate.getFullYear());
        start.setMonth(this.datePeriod.startDate.getMonth());
        start.setDate(this.datePeriod.startDate.getDate() + i);
        start.setHours(10 + e);
        start.setMinutes(0);
        start.setSeconds(0);
        end.setFullYear(this.datePeriod.startDate.getFullYear());
        end.setMonth(this.datePeriod.startDate.getMonth());
        end.setDate(this.datePeriod.startDate.getDate() + i);
        end.setHours((10 + 1) + e);
        end.setMinutes(0);
        end.setSeconds(0);

        this.map2.set(start, end);
      }

    }
    console.log('map2');
    console.log(this.map2);

    this.map2.forEach((val, key) => {
      this.resultArray.push({
        roomRentalId: this.id,
        startDate: new Date(key + 'Z'),
        endDate: new Date(val + 'Z')
      });
    });
    console.log('check');
    console.log(this.resultArray);
    this.roomDateService.checkedTimeRoom(this.resultArray, this.id).subscribe((data: Status) => {
      if (data.message === 'no exist') {
        console.log(data);
        this.createPeriodDateTime(order);
      } else if (data.message === 'exist') {
        console.log(data);
        this.isInputInf = true;
        this.isMassage = true;
      }
    });
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
    this.manyDayTime();
    this.saveManyDateTime(order);
  }


  /**
   * save in map room time by many day;
   * ****/
  private manyDayTime() {
    this.datePeriod.startDate.setHours(10);
    this.datePeriod.startDate.setMinutes(0);
    for (let i = 0; i < this.countDay; i++) {
      for (let e = 0; e < 9; e++) {

        const start = new Date();
        const end = new Date();
        start.setFullYear(this.datePeriod.startDate.getFullYear());
        start.setMonth(this.datePeriod.startDate.getMonth());
        start.setDate(this.datePeriod.startDate.getDate() + i);
        start.setHours(10 + e);
        start.setMinutes(0);
        start.setSeconds(0);
        end.setFullYear(this.datePeriod.startDate.getFullYear());
        end.setMonth(this.datePeriod.startDate.getMonth());
        end.setDate(this.datePeriod.startDate.getDate() + i);
        end.setHours((10 + 1) + e);
        end.setMinutes(0);
        end.setSeconds(0);

        this.map1.set(start, end);
        console.log(this.datePeriod.startDate.getDate());
      }
    }
  }


  /**
   * save order many day time;
   * ***/
  private saveManyDateTime(order) {
    this.resultArray = [];
    this.orderRoomService.createOrderRoom(order).subscribe((date: OrderRoom) => {
      console.log(date);
      if (date !== null) {
        this.map1.forEach((val, key) => {
          this.resultArray.push({
            roomRentalId: this.id,
            orderRoomId: date.id,
            startDate: new Date(key + 'Z'),
            endDate: new Date(val + 'Z')
          });
        });
        this.saveDateTimeManyDay();
      }

      console.log(this.resultArray);
    });
  }

  /**
   * save date many day time;
   * **/
  private saveDateTimeManyDay() {
    this.roomDateService.createTimeOrderRoom(this.resultArray).subscribe(data => {
      console.log(data);
    });
  }


  liqPayInvoiceRoom() {
    const order = new OrderRoom();
    order.nameSurname = this.f.name.value;
    order.email = this.f.email.value;
    order.phone = this.f.phone.value;
    order.currency = this.room.priseRoom[0].currency;
    order.description = this.f.description.value;
    order.roomRentalId = this.id;
    order.nameRoom = this.room.nameRoom;


    /**
     * if arrayOrder not empty;
     * ***/
    if (this.arrayOrder.length !== 0) {
      order.price = this.room.priseRoom[0].priceHour * this.numOrder;
      order.startTime = new Date(this.arrayOrder[0].startDate + 'Z');
      order.endTime = new Date(this.arrayOrder[this.arrayOrder.length - 1].endDate + 'Z');
      console.log(order);
      // this.isInputInf = false;
      // this.isLiqPay = true;
      this.checkTimeRoom(order);
    } else if (this.datePeriod !== undefined) {

      order.price = this.room.priseRoom[0].priceDay * this.countDay;
      console.log('test');
      const {start2, end2} = this.setTime();

      order.startTime = start2;
      order.endTime = end2;
      // this.isInputInf = false;
      // this.isLiqPay = false;
      this.checkManyDateTimeRoom(order);

    }
  }


  /**
   * set time;
   * **/
  private setTime() {
    const start = new Date();
    start.setFullYear(this.datePeriod.startDate.getFullYear());
    start.setMonth(this.datePeriod.startDate.getMonth());
    start.setDate(this.datePeriod.startDate.getDate());
    start.setHours(10);
    start.setMinutes(0);
    start.setSeconds(0);
    const start2 = new Date(start + 'Z');
    const end = new Date();
    end.setFullYear(this.datePeriod.endDate.getFullYear());
    end.setMonth(this.datePeriod.endDate.getMonth());
    end.setDate(this.datePeriod.endDate.getDate());
    end.setHours(19);
    end.setMinutes(0);
    end.setSeconds(0);
    const end2 = new Date(end + 'Z');
    return {start2, end2};
  }
}
