import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../../shared/model/room/Room.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomRentalService} from '../../../../../shared/service/roomRental/room-rental.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-edit-name-room',
  templateUrl: './edit-name-room.component.html',
  styleUrls: ['./edit-name-room.component.scss']
})
export class EditNameRoomComponent implements OnInit {

  roomError: Room;
  isCreated = false;
  room: Room = new Room();
  id: number;


  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;


  constructor(private idNumber: ActivatedRoute,
              private roomRentalService: RoomRentalService,
              private progress: NgProgress,
              private fb: FormBuilder,
              private router: Router) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getOne(this.id);
    this.createFormGroup();
  }

  /**
   * get one room;
   * **/
  getOne(id: number) {
    this.roomRentalService.adminOneRoom(id).subscribe((data: Room) => {
      this.room = data;
    });
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
  updateRoom() {
    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const room = new Room();
    room.nameRoom = this.f.nameRoom.value;
    room.roomCapacity = this.f.roomCapacity.value;
    room.id = this.id;

    this.progress.ref().start();
    this.roomRentalService.adminUpdateRoom(room).subscribe(() => {
      this.getOne(this.id);
      this.progress.ref().complete();
    }, error => {
      this.roomError = error.error;
      this.isCreated = false;
      this.progress.ref().complete();
    });
  }


  /**
   * redirect back
   * **/
  back() {
    this.router.navigate(['admin', 'room', 'rental', 'edit-room', this.id]);
  }
}
