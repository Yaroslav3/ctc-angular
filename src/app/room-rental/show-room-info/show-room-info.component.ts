import {Component, ElementRef, OnInit, Renderer2, ViewChildren} from '@angular/core';
import {RoomRentalService} from '../../shared/service/roomRental/room-rental.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoRoom} from '../../shared/model/room/PhotoRoom.model';
import {Room} from '../../shared/model/room/Room.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {RoomTimeOrder} from '../../shared/model/room/RoomTimeOrder.model';
import {RoomDateService} from '../../shared/service/roomRental/room-date.service';
import {DatePipe} from '@angular/common';
import {Status} from '../../shared/model/status/Status.model';
import {TransferRoomOrderService} from '../../shared/service/share/transfer/transfer-room-order.service';
import {TransferRoomService} from "../../shared/service/share/transfer/transfer-room.service";
import {TransferDatePeriodService} from "../../shared/service/share/transfer/transfer-date-period.service";
import {RoomDatePeriod} from "../../shared/model/room/RoomDatePeriod.model";


@Component({
  selector: 'app-show-room-info',
  templateUrl: './show-room-info.component.html',
  styleUrls: ['./show-room-info.component.scss', './show-room-info.adaptive.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ShowRoomInfoComponent implements OnInit {

  @ViewChildren('inputs') public inputs: ElementRef<HTMLInputElement>[];

  constructor(
    private idNumber: ActivatedRoute,
    private roomRentalService: RoomRentalService,
    private config: NgbDatepickerConfig,
    private roomDateService: RoomDateService,
    private route: Router,
    private renderer: Renderer2,
    private transferRoomOrderService: TransferRoomOrderService,
    private transferRoomService: TransferRoomService,
    private transferDatePeriodService: TransferDatePeriodService) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  id: number;
  room: Room;
  photo: PhotoRoom;
  date: Date;
  dateManyDay: Date;
  def = 'Почасовая';
  bu: boolean;
  arrayTime = [];

  isChoiceOrder = true;

  isEmptyArray: boolean;
  isCheckDate: boolean;

  isDisabledBtnPeriodDay = false;

  timeChoice = [
    {time: '10:00 - 11:00', status: false},
    {time: '11:00 - 12:00', status: false},
    {time: '12:00 - 13:00', status: false},
    {time: '13:00 - 14:00', status: false},
    {time: '14:00 - 15:00', status: false},
    {time: '15:00 - 16:00', status: false},
    {time: '16:00 - 17:00', status: false},
    {time: '17:00 - 18:00', status: false},
    {time: '18:00 - 19:00', status: false}
  ];
  timeCheckbox: any = [];

  editorConfig: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
    height: 'auto',
    defaultFontSize: '5',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };


  ngOnInit() {
    window.scroll(0, 0);
    this.oneRoom(this.id);
    this.setDayCalendar();
    this.getAllTimeDay();
  }

  /**
   * set day calendar;
   * **/
  setDayCalendar() {

    this.date = new Date();
    this.date.setDate(this.date.getDate() + 1);

    this.dateManyDay = new Date();
    this.dateManyDay.setDate(this.date.getDate() + 1);
    const current = new Date();
    this.config.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    this.config.outsideDays = 'hidden';


    /**
     *  show default info on one day;
     * **/
    if (this.isChoiceOrder === true) {
      console.log('Почасовая');
      const end = new Date(this.date);
      const start = new Date(this.date);
      end.setDate(start.getDate());
      start.setHours(10);
      start.setMinutes(0);
      end.setHours(20);
      end.setMinutes(0);
      this.dateTime(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));

    } else if (this.isChoiceOrder === false) {
      console.log('Несколько дней');
      const start = new Date(this.date);
      start.setMinutes(0);
      start.setHours(0);
      const end = new Date(this.dateManyDay);
      end.setMinutes(59);
      end.setHours(23);
      this.periodDayRoom(this.transform(String(start.valueOf())), this.transform(String(this.dateManyDay.valueOf())));
    }

  }


  /**
   * get one Room;
   * **/
  oneRoom(id: number) {
    this.roomRentalService.getOneRoom(id).subscribe((data: Room) => {
      this.room = data;
      this.photo = data.photoRoom;
      this.transferRoomService.setData(data);
    });
  }


  /**
   * get all time on one day ;
   ***/
  dateTime(start: string, end: string) {
    this.roomDateService.timeOneDayRoom(start, end, this.id).subscribe((data: RoomTimeOrder) => {
        this.showTimeOrder(data);
        // console.log(data);
      }
    );
  }

  /**
   * Choice time on many day;
   ***/
  periodDayRoom(start: string, end: string) {
    this.roomDateService.periodDayRoom(start, end, this.id).subscribe((data: Status) => {
      if (data.message === 'not empty') {
        this.isCheckDate = true;
        this.isDisabledBtnPeriodDay = true;
      } else {
        this.isCheckDate = false;
        this.isDisabledBtnPeriodDay = false;
      }
      // console.log(data);
    });
  }


  /**
   * get all time day
   * ***/
  private getAllTimeDay() {
    this.timeCheckbox = Object.keys(this.timeChoice).map(key =>
      ({time: key, number: key, value: this.timeChoice[key]}));
  }


  onChange(time: string, isChecked: boolean) {
    if (this.isChoiceOrder === true) {
      console.log('Почасовая_2');
      const roomTimeOrder = new RoomTimeOrder();
      const numberEnd = time.lastIndexOf('-');
      const end = numberEnd + 2;
      const num: any = time.substring(end).replace(/[0/: /-]/g, '');

      if (isChecked === true) {
        /**
         * start time;
         * **/
        roomTimeOrder.startDate = this.createNumberData(Number(num - 1));

        /**
         * end time;
         * **/
        roomTimeOrder.endDate = this.createNumberData(Number(num));
        this.arrayTime.push(roomTimeOrder);
      } else {

        for (let i = 0; i < this.arrayTime.length; i++) {
          if (new Date(this.arrayTime[i]['startDate']).getHours() === this.createNumberData(Number(num - 1)).getHours()) {
            this.arrayTime.splice(i, 1);
          }
        }
      }
      this.isEmptyArray = false;
      // console.log(this.arrayTime);
    } else {
      console.log('Несколько дней_2');
    }
  }


  /**
   *  selectPeriodDate date whits ngbDatepicker
   * **/
  select(startPeriod: string) {
    if (this.isChoiceOrder === true) {
      // console.log('Почасовая_3');
      const end = new Date(startPeriod);
      const start = new Date(this.date);
      end.setDate(start.getDate());
      start.setHours(10);
      start.setMinutes(0);
      end.setHours(20);
      end.setMinutes(0);

      this.dateTime(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));
      this.inputs.forEach(check => {
        check.nativeElement.checked = false;
      });

      this.arrayTime = [];
    } else {
      // console.log('Несколько дней_3');
      this.dateManyDay = new Date(startPeriod);
      this.dateManyDay.setDate(this.date.getDate() + 1);
      const start = new Date(this.date);
      start.setMinutes(0);
      start.setHours(0);
      const end = new Date(this.dateManyDay);
      end.setMinutes(59);
      end.setHours(23);
      this.periodDayRoom(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));

      // console.log(startPeriod);
      // console.log(this.dateManyDay);
    }
  }

  /**
   * show time order room;
   * ***/
  private showTimeOrder(data: RoomTimeOrder) {
    if (Object.keys(data).length === 0) {
      for (let b = 0; b < Object.keys(this.timeChoice).length; b++) {
        this.timeChoice[b].status = false;
      }
    } else {
      for (let b = 0; b < Object.keys(this.timeChoice).length; b++) {
        this.timeChoice[b].status = false;
      }
    }

    for (let i = 0; i < Object.keys(data).length; i++) {
      for (let b = 0; b < Object.keys(this.timeChoice).length; b++) {
        if (this.transformTime(data[i].startDate) +
          ' - ' + this.transformTime(data[i].endDate) === this.timeChoice[b].time) {
          this.timeChoice[b].status = true;
        }
      }
    }
  }


  /**
   *  Set duration period date order room;
   * ***/
  onSetDuration(value: any) {
    if (value === 'Почасовая') {
      this.arrayTime = [];
      this.isChoiceOrder = true;
      this.setDayCalendar();
    } else if (value === 'Несколько дней') {
      this.isChoiceOrder = false;
      this.setDayCalendar();
    }
  }


  /**
   *  after click button on select date;
   * ****/
  nextOnOrder() {
    if (this.isChoiceOrder === true) {
      if (this.arrayTime.length === 0) {
        this.isEmptyArray = true;
      } else {

        /**
         * redirect to order time room;
         * ***/
        this.transferRoomOrderService.setData(this.arrayTime);
        // console.log(this.arrayTime);
        this.route.navigate(['room', 'order', this.id]);
      }
    } else {

      /**
       * redirect to order by many date room;
       * ***/
      const datePeriod = new RoomDatePeriod();
      datePeriod.startDate = this.date;
      datePeriod.endDate = this.dateManyDay;
      this.transferDatePeriodService.setData(datePeriod);
      this.route.navigate(['room', 'order', this.id]);
    }
  }


  /**
   * select many day date;
   * **/
  selectPeriodDate(date: any) {
    this.dateManyDay = date;
    const start = new Date(this.date);
    start.setMinutes(0);
    start.setHours(0);
    const end = new Date(this.dateManyDay);
    end.setMinutes(59);
    end.setHours(23);
    this.periodDayRoom(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));
  }


  /**
   * private method;
   * ****/
  private createNumberData(endNumber: number) {
    const datePipe = new DatePipe('en-US');
    this.date.setHours(endNumber);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    const s = datePipe.transform(this.date, 'short');
    return new Date(s);
  }

  private transformTime(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'HH:mm');
    return value;
  }

  private transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd HH:mm');
    return value;
  }
}
