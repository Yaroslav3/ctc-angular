import {Component, OnInit} from '@angular/core';
import {OrderRoomService} from '../../../../shared/service/roomRental/order-room.service';
import {OrderRoom} from '../../../../shared/model/room/OrderRoom.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Status} from '../../../../shared/model/status/Status.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-found-room',
  templateUrl: './found-room.component.html',
  styleUrls: ['./found-room.component.scss']
})
export class FoundRoomComponent implements OnInit {

  orderRoom: OrderRoom;
  isEmpty = false;
  isRemove = false;

  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;


  constructor(private orderRoomService: OrderRoomService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    this.createFormGroup();
  }


  /***
   *  Form Group for validation
   * **/
  createFormGroup() {
    return this.formGroup = this.fb.group({
      id: ['', [Validators.required]],

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


  test() {
    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      console.log('error');
      return;
    }
    console.log(this.f.id.value);
    this.getOrderById(this.f.id.value);
  }

  /**
   * Find order;
   * ***/
  getOrderById(id: number) {
    this.isEmpty = false;
    this.isRemove = false;
    this.orderRoomService.getOneOrderRoom(id).subscribe((date: OrderRoom) => {
      console.log(date);
      this.orderRoom = date;
    }, error1 => {
      this.isEmpty = true;
    });
  }

  /**
   * Open modal view
   * **/
  openModal(view) {
    this.modalService.open(view);
  }

  /**
   * Delete order room;
   * **/
  deleteOrderRoom(id: number) {
    this.orderRoomService.deleteOrderRoom(id).subscribe((data: Status) => {
      if (data.message === 'remove') {
        this.isRemove = true;
        this.isEmpty = false;
        this.modalService.dismissAll(1);
      } else {
        window.alert('error');
      }

    });
  }


  /**
   * Redirect order room;
   * **/
  onClickOpenOrder(id: number) {
    this.router.navigate(['admin', 'room', 'rental', 'show-order-room-one', id]);
  }
}
