import {Injectable} from '@angular/core';
import {RoomDatePeriod} from '../../../model/room/RoomDatePeriod.model';

@Injectable({
  providedIn: 'root'
})
export class TransferDatePeriodService {


  private datePeriod: RoomDatePeriod;

  constructor() {
  }

  setData(data) {
    this.datePeriod = data;
  }

  getData() {
    const temp = this.datePeriod;
    // this.clearData();
    return temp;
  }

  clearData() {
    this.datePeriod = undefined;
  }
}
