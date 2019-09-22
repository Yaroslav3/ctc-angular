import {Component, OnInit} from '@angular/core';
import {RoomRentalService} from '../../../shared/service/roomRental/room-rental.service';
import {Room} from '../../../shared/model/room/Room.model';
import {NgProgress} from '@ngx-progressbar/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {OrderRoomService} from "../../../shared/service/roomRental/order-room.service";
import {OrderRoom} from "../../../shared/model/room/OrderRoom.model";

@Component({
  selector: 'app-data-room',
  templateUrl: './data-room.component.html',
  styleUrls: ['./data-room.component.scss']
})
export class DataRoomComponent implements OnInit {

  room: Room;
  p: number;

  isEmpty: boolean;

  constructor(private roomRentalService: RoomRentalService,
              private progress: NgProgress,
              private modalService: NgbModal,
              private router: Router,
              private orderRoomService: OrderRoomService) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.roomRentalAll();
  }


  /**
   * Get one order room;
   * ***/
  getOneOrderRoom(id: number) {
    this.orderRoomService.getOneOrderRoom(id).subscribe((date: OrderRoom) => {
      console.log(date);
    });
  }

  /**
   * show all Room
   * ***/
  roomRentalAll() {
    this.progress.ref().start();
    this.roomRentalService.adminRoomRentalAll().subscribe((data: Room) => {
      if (data === null) {
        this.isEmpty = true;
        this.progress.ref().complete();
      } else {
        this.isEmpty = false;
        this.room = data;
        console.log(data);
        this.progress.ref().complete();
      }
    });
  }


  /**
   * open modal window
   * **/
  openModal(view) {
    this.modalService.open(view);
  }

  /**
   * remove Room
   * **/
  removeRoom(id: any) {
    this.roomRentalService.adminRoomRemove(id).subscribe((data) => {
      console.log(data);
      this.roomRentalAll();
      this.modalService.dismissAll(1);
    }, error => {
      window.alert(error.massage);
    });
  }

  /**
   * redirect page to Edit room
   * **/
  onEdit(id: number) {
    console.log(id);
    this.router.navigate(['admin', 'room', 'rental', 'edit-room', id]);
  }
}
