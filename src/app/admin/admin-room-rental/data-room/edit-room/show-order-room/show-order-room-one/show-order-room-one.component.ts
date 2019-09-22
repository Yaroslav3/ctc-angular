import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderRoomService} from '../../../../../../shared/service/roomRental/order-room.service';
import {OrderRoom} from '../../../../../../shared/model/room/OrderRoom.model';
import {RoomDatePeriod} from '../../../../../../shared/model/room/RoomDatePeriod.model';

@Component({
  selector: 'app-show-order-room-one',
  templateUrl: './show-order-room-one.component.html',
  styleUrls: ['./show-order-room-one.component.scss'],
})
export class ShowOrderRoomOneComponent implements OnInit {

  orderRoom: OrderRoom;
  dateRoom: RoomDatePeriod;
  id: number;


  constructor(private idNumber: ActivatedRoute,
              private orderRoomService: OrderRoomService) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getOneOrderRoom(this.id);
  }

  /**
   * Get one order room;
   * ***/
  getOneOrderRoom(id: number) {
    this.orderRoomService.getOneOrderRoom(id).subscribe((date: OrderRoom) => {
      // console.log(date);
      this.orderRoom = date;
      this.dateRoom = date.dateRoom;
      console.log(this.dateRoom);
    });
  }

}
