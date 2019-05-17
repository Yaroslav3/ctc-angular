import {Component, OnInit} from '@angular/core';
import {RoomRentalService} from '../../../../../shared/service/roomRental/room-rental.service';
import {Room} from '../../../../../shared/model/room/Room.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomPrice} from '../../../../../shared/model/room/RoomPrice.model';
import {RoomPriseService} from '../../../../../shared/service/roomRental/room-prise.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../../../../shared/model/status/Status.model';

@Component({
  selector: 'app-add-prise-room',
  templateUrl: './add-prise-room.component.html',
  styleUrls: ['./add-prise-room.component.scss']
})
export class AddPriseRoomComponent implements OnInit {
  id: number;
  nameRoom: string;

  priceError: RoomPrice;
  isCreated = false;

  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  isCheck: boolean;

  constructor(private idNumber: ActivatedRoute,
              private roomRentalService: RoomRentalService,
              private roomPriseService: RoomPriseService,
              private fb: FormBuilder,
              private router: Router) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.checkRoom(this.id);
    this.getOneRoom(this.id);
    this.createFormGroup();

  }

  /**
   * check by id room rental
   * **/
  checkRoom(id: number) {
    this.roomPriseService.adminCheck(id).subscribe((data: Status) => {
      this.isCheck = data.message === 'ok';
    });
  }

  /**
   * get one room;
   * **/
  getOneRoom(id: number) {
    this.roomRentalService.adminOneRoom(id).subscribe((data: Room) => {
      this.nameRoom = data.nameRoom;
    });
  }

  /***
   *  Form Group for validation
   * **/
  createFormGroup() {
    return this.formGroup = this.fb.group({
      priceHour: ['', [Validators.required, Validators.maxLength(7)]],
      priceDay: ['', [Validators.required, Validators.maxLength(7)]],
      currency: ['', [Validators.required]],
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
   * create prise room;
   * **/
  createRoomPrice() {

    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }
    const price = new RoomPrice();
    price.priceHour = this.f.priceHour.value;
    price.priceDay = this.f.priceDay.value;
    price.currency = this.f.currency.value;

    this.roomPriseService.adminCreatePrise(this.id, price).subscribe((data) => {
      this.redirectPhoto(this.id);
    }, error => {
      this.priceError = error.error;
      this.isCreated = true;
    });
  }

  /**
   * router photo room;
   * **/
  private redirectPhoto(id: number) {
    this.router.navigate(['admin', 'room', 'rental', 'add-photo-room', id]);
  }

  /**
   * redirect to edit;
   * ****/
  redirect() {
    console.log('test');
  }
}
