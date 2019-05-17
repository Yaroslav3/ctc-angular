import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferRoomOrderService {


  private dateTime = [];

  constructor() {
  }

  setData(data) {
    this.dateTime = data;
  }

  getData() {
    const temp = this.dateTime;
    // this.clearData();
    return temp;
  }

  clearData() {
    this.dateTime = undefined;
  }
}
