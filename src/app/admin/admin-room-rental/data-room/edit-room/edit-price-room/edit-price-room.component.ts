import {Component, OnInit} from '@angular/core';
import {RoomPrice} from '../../../../../shared/model/room/RoomPrice.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomRentalService} from '../../../../../shared/service/roomRental/room-rental.service';
import {RoomPriseService} from '../../../../../shared/service/roomRental/room-prise.service';
import {Room} from '../../../../../shared/model/room/Room.model';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-edit-price-room',
  templateUrl: './edit-price-room.component.html',
  styleUrls: ['./edit-price-room.component.scss']
})
export class EditPriceRoomComponent implements OnInit {

  id: number;
  nameRoom: string;

  priceError: RoomPrice;
  isCreated = false;
  price: RoomPrice = new RoomPrice();

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
              private router: Router,
              private progress: NgProgress) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getOneRoom(this.id);
    this.createFormGroup();

  }


  /**
   * get one room;
   * **/
  getOneRoom(id: number) {
    this.roomRentalService.adminOneRoom(id).subscribe((data: Room) => {
      this.nameRoom = data.nameRoom;
      if (data.priseRoom == null) {
        this.isCheck = false;
      } else {
        this.isCheck = true;
        this.nameRoom = data.nameRoom;
        this.price = data.priseRoom[0];
      }

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
  updateRoomPrice() {

    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }
    const price = new RoomPrice();
    price.priceHour = this.f.priceHour.value;
    price.priceDay = this.f.priceDay.value;
    price.currency = this.f.currency.value;
    price.id = this.price.id;
    this.progress.ref().start();
    this.roomPriseService.adminUpdatePrice(this.id, price).subscribe(() => {
      this.progress.ref().complete();
    }, error => {
      this.progress.ref().complete();
      this.priceError = error.error;
      this.isCreated = true;
    });
  }


  /**
   * redirect to room edit;
   * ****/
  back() {
    this.router.navigate(['admin', 'room', 'rental', 'edit-room', this.id]);
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
    this.progress.ref().start();
    this.roomPriseService.adminCreatePrise(this.id, price).subscribe((data) => {
      this.progress.ref().complete();
    }, error => {
      this.progress.ref().complete();
      this.priceError = error.error;
      this.isCreated = true;
    });
  }
}
