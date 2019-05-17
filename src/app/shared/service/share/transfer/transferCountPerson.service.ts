import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferCountPersonService {

  constructor() {
  }

  private count: number;

  setData(data) {
    this.count = data;
  }

  getData() {
    const temp = this.count;
    // this.clearData();
    return temp;
  }

  clearData() {
    this.count = undefined;
  }
}
