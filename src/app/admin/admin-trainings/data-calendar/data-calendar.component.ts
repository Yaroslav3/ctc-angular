import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import 'jquery-ui-dist/jquery-ui';

import {CalendarTrainings} from '../../../shared/model/CalendarTrainings';
import {
  ModalDismissReasons,
  NgbCalendar,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerConfig,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {TrainingsCalendarService} from '../../../shared/service/trainings/trainings-calendar.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-data-calendar',
  templateUrl: './data-calendar.component.html',
  styleUrls: ['./data-calendar.component.scss', './data-calendar.adaptive.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class DataCalendarComponent implements OnInit {

  startEvent: Date;
  endEvent: Date;

  constructor(protected el: ElementRef, private  calendarService: TrainingsCalendarService,
              private calendar: NgbCalendar, private modalService: NgbModal, private config: NgbDatepickerConfig,
              public progressService: NgProgress) {
    // config.minDate = {year: 1900, month: 1, day: 1};
    // config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
    config.outsideDays = 'collapsed';

  }

  /**
   * choose color background
   ***/
  color: string[] = ['green', 'blue', 'darkblue', 'darkslateblue', 'yellow', 'darkkhaki', 'crimson', 'orange', 'mediumspringgreen',
    'yellowgreen', 'lightseagreen', 'magenta', 'darkmagenta', 'chocolate', 'maroon'];


  /***
   * choose text color
   * ***/
  colorText: string[] = ['black', 'white', 'red', 'blue'];


  modelCalendarTrainingsDate: CalendarTrainings = new CalendarTrainings();
  model: CalendarTrainings = new CalendarTrainings();
  events: any;
  displayEvent: any;
  id: number;


  calendarOptions: Options;
  closeResult: string;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;


  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.loadEventsCalendar();
  }


  /**
   *  get data FullCalendar
   * ****/
  fullCalendar(data: CalendarTrainings) {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      timezone: 'Europe/Kiev',
      locale: 'ru',
      height: 500,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      themeSystem: 'standard',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      events: data,

    };
  }


  /***
   * loading  all calendar data events from server
   * ***/
  loadEventsCalendar() {
    this.progressService.ref().start();
    this.calendarService.adminGetAllTrainingsCalendar().subscribe((data: CalendarTrainings) => {
      this.events = data;
      console.log(data);
      this.fullCalendar(data);
      this.progressService.ref().complete();
    });
  }


  /***
   * Open modal view set date event
   * ***/
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${DataCalendarComponent.getDismissReason(reason)}`;
    });
  }


  /***
   *  save data event to server
   *  close modal view
   * ***/
  ngSaveDateCalendarTrainings(cal: CalendarTrainings) {

    console.log(cal.start);
    this.progressService.ref().start();
    this.calendarService.adminSaveCalendarTrainings(cal).subscribe((data: CalendarTrainings) => {
      this.id = data.id;
      this.modalService.dismissAll(2);
      this.progressService.ref().complete();
      window.alert('add event susses');
      this.ucCalendar.fullCalendar('renderEvent', cal);
    }, error => {
      window.alert('error - ' + error.message);
    });
  }


  /***
   * click event update
   * ****/
  eventClick(event, view) {
    this.modalService.open(view);
    this.getOneCalendarTrainings(event.event.id);
  }


  /**
   * get one Calendar Training
   *
   * ***/
  getOneCalendarTrainings(id: number) {
    console.log(id);
    if (id === undefined) {
      id = this.id;
    }
    this.progressService.ref().start();
    this.calendarService.adminGetOneCalendarTrainingsEvent(id).subscribe((data: CalendarTrainings) => {
      this.modelCalendarTrainingsDate = data;
      this.startEvent = new Date(data.start);
      this.endEvent = new Date(data.end);
      this.progressService.ref().complete();
    });
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }


  /***
   * update Training Calendar on drag and drop
   * **/
  updateEvent(model: any) {
    const calendar: CalendarTrainings = new CalendarTrainings();
    calendar.title = model.event.title;
    calendar.start = model.event.start;
    calendar.end = model.event.end;
    calendar.color = model.event.color;
    calendar.textColor = model.event.textColor;
    this.calendarService.adminUpdateCalendarTrainingsEvent(model.event.id, calendar)
      .subscribe((data: CalendarTrainings) => {
        model = {
          event: {
            id: data.id,
            start: data.start,
            end: data.end,
            title: data.title,
            color: data.color,
            textColor: data.textColor
            // other params
          },
          duration: {
            _data: model.duration._data
          }
        };
        this.displayEvent = model;
      }, error2 => {
        window.alert('error');
      });
  }

  /***
   * start update modal view
   * ***/
  updateEventBtn(view) {
    this.modalService.open(view);
  }

  /***
   * update Training Calendar on modal view
   * ***/
  updateCalendarTrainingModalView(id: number, calendarTrainings: CalendarTrainings) {
    this.progressService.ref().start();
    this.calendarService.adminUpdateCalendarTrainingsEvent(id, calendarTrainings)
      .subscribe((data: CalendarTrainings) => {
        this.ucCalendar.fullCalendar('renderEvent', data);
        this.progressService.ref().complete();
      }, error2 => {
        window.alert('error');
      });
    this.modalService.dismissAll(2);
  }


  destroyEvent(model: any) {
    this.displayEvent = model;
  }

  /**
   * remove event
   * **/
  removeEventBtn(view) {
    this.modalService.open(view);
  }

  removeEventViewBtn(id: number) {
    this.progressService.ref().start();
    this.calendarService.adminDeleteCalendarTrainingsEvent(id).subscribe(() => {
      this.modalService.dismissAll(2);

      this.progressService.ref().complete();
    }, error => {
      window.alert('error - ' + error.message);
    });
  }


  delete(detail: any) {

  }
}
