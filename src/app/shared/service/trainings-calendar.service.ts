import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CalendarTrainings} from '../model/CalendarTrainings';
import {eAdminCalendarTrainings, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingsCalendarService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /***
   *  get all Trainings Calendar
   *
   * ***/
  adminGetAllTrainingsCalendar() {
    return this.http.get(this.host + eAdminCalendarTrainings.adminUrlGetAllTrainingsCalendarEvent);
  }

  /***
   * save Calendar Trainings
   *
   * **/
  adminSaveCalendarTrainings(calendar: CalendarTrainings) {
    return this.http.post(this.host + eAdminCalendarTrainings.adminUrlSaveCalendarTrainingsEvent, calendar,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  /***
   * get one Calendar Trainings on id
   * ***/
  adminGetOneCalendarTrainingsEvent(id: number) {
    return this.http.get(`${this.host + eAdminCalendarTrainings.adminUrlGetOneTrainingsCalendarEvent}/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  /***
   * update event Calendar Training on id
   * ***/
  adminUpdateCalendarTrainingsEvent(id: number, calendarTrainings: CalendarTrainings) {
    return this.http.put<CalendarTrainings>(`${this.host + eAdminCalendarTrainings
        .adminUrlUpdateTrainingsCalendarEvent}/${id}`,
      calendarTrainings, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  /***
   *  delete event on calendar
   * ***/
  adminDeleteCalendarTrainingsEvent(id: number) {
    return this.http.delete(`${this.host + eAdminCalendarTrainings
      .adminUrlDeleteTrainingsCalendarEvent}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
