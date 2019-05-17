import {Injectable} from '@angular/core';
import {Webinars} from '../../../model/webinars/Webinars.model';

@Injectable({
  providedIn: 'root'
})
export class TransferWebinarService {

  private webinar: Webinars;

  constructor() {
  }

  setData(data) {
    this.webinar = data;
  }

  getData() {
    const temp = this.webinar;
    // this.clearData();
    return temp;
  }

  clearData() {
    this.webinar = undefined;
  }
}
