import {Injectable} from '@angular/core';
import {Room} from '../../../model/room/Room.model';

@Injectable({
  providedIn: 'root'
})
export class TransferRoomService {

  private room: Room;

  constructor() {
  }

  setData(data) {
    this.room = data;
  }

  getData() {
    const temp = this.room;
    // this.clearData();
    return temp;
  }

  clearData() {
    this.room = undefined;
  }
}
