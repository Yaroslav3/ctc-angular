import {Component, OnInit} from '@angular/core';
import {Order} from '../shared/model/Order.model';
import {Trainings} from '../shared/model/trainings/Trainings.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {TrainersService} from '../shared/service/trainers.service';
import {TrainingsService} from '../shared/service/trainings/trainings.service';
import {Trainers} from '../shared/model/Trainers.model';
import {OrderService} from '../shared/service/order.service';
import {NgProgress} from '@ngx-progressbar/core';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', './order.adaptive.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class OrderComponent implements OnInit {
  protected orderError: Order;
  protected isCreated = false;


  trainings: Trainings;
  modelOrderTrainers: Order = new Order();
  trainersCheckbox: any = [];
  myForm: FormGroup;
  done = true;
  doneOrder = false;
  pipe = new DatePipe('en-US');


  /**
   *  for validation.
   * ***/
  orderForm: FormGroup;
  form: any = {};

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;


  constructor(private serviceTraining: TrainersService,
              private serviceTrainings: TrainingsService,
              private fb: FormBuilder,
              private orderService: OrderService,
              private config: NgbDatepickerConfig,
              public progressService: NgProgress) {
    this.myForm = this.fb.group({orderTrainers: this.fb.array([])});
    this.config.outsideDays = 'hidden';
  }

  /**
   *   override Object in array
   * **/

  ngOnInit(): void {
    this.createFormGroup();


    window.scroll(0, 0);
    this.getAllTrainers();
    this.getAllTrainings();
  }


  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.orderForm = this.fb.group({
      date: ['', [Validators.required]],
      training: ['', [Validators.required]],
      city: ['', [Validators.required]],
      company: ['', [Validators.required]],
      nameSurname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.maxLength(1025)]],
    });
  }


  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.orderForm.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.orderForm.reset();
  }


  /**
   * get all Trainings
   * **/
  private getAllTrainings() {
    this.progressService.ref().start();
    this.serviceTrainings.getAllTrainings().subscribe((t: Trainings) => {
      this.trainings = t;
      this.progressService.ref().complete();
    });
  }

  /**
   * get all trainers
   * ***/
  private getAllTrainers() {
    this.progressService.ref().start();
    this.serviceTraining.getAllTrainers().subscribe((resp: Trainers) => {
      this.trainersCheckbox = Object.keys(resp).map(key => ({trainers: key, value: resp[key]}));      // Override Object in array
      this.progressService.ref().complete();
    });
  }

  onChange(name: string, surname: string, isChecked: boolean) {
    const trainersFormArray = this.myForm.controls.orderTrainers as FormArray;
    if (isChecked) {
      trainersFormArray.push(new FormControl(name + ' ' + surname));
    } else {
      const index = trainersFormArray.controls.findIndex(x => x.value === name);
      trainersFormArray.removeAt(index);
    }
  }


  /**
   *  method save Order
   * ***/
  submitOrderSave() {

    this.isSubmitted = true;

    if (this.orderForm.invalid) {
      return;
    }

    this.progressService.ref().start();
    const order = new Order();
    order.orderTrainers = this.myForm.controls.orderTrainers.value.join(' , ');
    order.date = this.orderForm.controls.date.value;
    order.training = this.orderForm.controls.training.value;
    order.country = this.orderForm.controls.country.value;
    order.city = this.orderForm.controls.city.value;
    order.company = this.orderForm.controls.company.value;
    order.nameSurname = this.orderForm.controls.nameSurname.value;
    order.phone = this.orderForm.controls.phone.value;
    order.email = this.orderForm.controls.email.value;
    order.description = this.orderForm.controls.description.value;

    this.orderService.saveOrder(order).subscribe(() => {
        this.isCreated = true;
        this.done = false;
        window.scroll(0, 500);
        this.doneOrder = true;
        this.progressService.ref().complete();
      },
      error => {
        this.orderError = error.error;
        this.isCreated = false;

      });
  }
}




