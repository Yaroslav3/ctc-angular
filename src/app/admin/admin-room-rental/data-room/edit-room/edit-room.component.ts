import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomRentalService} from '../../../../shared/service/roomRental/room-rental.service';
import {Room} from '../../../../shared/model/room/Room.model';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {

  id: number;
  room: Room;

  constructor(private idNumber: ActivatedRoute,
              private roomService: RoomRentalService) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getOneRoom(this.id);
  }

  private getOneRoom(id: number) {
    this.roomService.adminOneRoom(id).subscribe((data: Room) => {
      this.room = data;
    });
  }

}
