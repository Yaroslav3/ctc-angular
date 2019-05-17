import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {CalendarTrainings} from '../shared/model/CalendarTrainings';
import {Options} from 'fullcalendar';
import {TrainingsCalendarService} from '../shared/service/trainings/trainings-calendar.service';
import {NgProgress} from '@ngx-progressbar/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  calendarOptions: Options;
  modelCalendarTrainingsDate = new CalendarTrainings;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private trainingsCalendarService: TrainingsCalendarService,
              public progressService: NgProgress,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getAllDateCalendar();
  }


  getAllDateCalendar() {
    this.progressService.ref().start();
    this.trainingsCalendarService.getAllDataCalendar().subscribe((date: CalendarTrainings) => {
      console.log(date);
      this.fullCalendar(date);
      this.progressService.ref().complete();
    });
  }


  /**
   *  get data FullCalendar
   * ****/
  fullCalendar(data: CalendarTrainings) {
    this.calendarOptions = {
      // editable: true,
      eventLimit: false,
      timezone: 'Europe/Kiev',
      locale: 'ru',
      height: 500,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,listMonth'
      },
      themeSystem: 'standard',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      events: data,

    };
  }

  eventClick(model, view) {
    this.modalService.open(view);
    this.modelCalendarTrainingsDate.start = model.event.start;
    this.modelCalendarTrainingsDate.end = model.event.end;
    this.modelCalendarTrainingsDate.title = model.event.title;
  }
}
