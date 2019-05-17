import {Component, OnInit} from '@angular/core';
import {RoomRentalService} from '../../../../shared/service/roomRental/room-rental.service';
import {Room} from '../../../../shared/model/room/Room.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {

  roomError: Room;
  isCreated = false;
  // room: Room = new Room();
  id: number;


  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;


  constructor(private roomRentalService: RoomRentalService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.createFormGroup();
  }

  /***
   *  Form Group for validation
   * **/
  createFormGroup() {
    return this.formGroup = this.fb.group({
      nameRoom: ['', [Validators.required, Validators.maxLength(200)]],
      roomCapacity: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.formGroup.controls;
  }

  /**
   *  reset
   * **/

  revert() {
    this.formGroup.reset();
  }


  /**
   *  save room;
   * **/
  saveRoom() {
    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const room = new Room();
    room.nameRoom = this.f.nameRoom.value;
    room.roomCapacity = this.f.roomCapacity.value;
    this.roomRentalService.adminCreateRoom(room).subscribe((data: Room) => {
      this.redirectArticle(data.id);
    }, error => {
      this.roomError = error.error;
      this.isCreated = false;
    });
  }


  /**
   * router article
   * **/
  private redirectArticle(id: number) {
    this.router.navigate(['admin', 'room', 'rental', 'add-room-rental', id]);
  }
}
