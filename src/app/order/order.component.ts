import {Component, OnInit} from '@angular/core';
import {Order} from '../shared/model/Order.model';
import {Trainings} from '../shared/model/Trainings.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {TrainersService} from '../shared/service/trainers.service';
import {TrainingsService} from '../shared/service/trainings.service';
import {Trainers} from '../shared/model/Trainers.model';
import {OrderService} from '../shared/service/order.service';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', './order.adaptive.component.scss']
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


  constructor(private serviceTraining: TrainersService, private serviceTrainings: TrainingsService,
              private fb: FormBuilder, private orderService: OrderService, public progressService: NgProgress) {
    this.myForm = this.fb.group({orderTrainers: this.fb.array([])});
  }

  /**
   *   override Object in array
   * **/

  ngOnInit(): void {

    window.scroll(0, 0);
    this.getAllTrainers();
    this.getAllTrainings();
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
  submitOrderSave(order: Order) {
    this.progressService.ref().start();
    order.orderTrainers = this.myForm.controls.orderTrainers.value.join(' , ');
    order.date = this.pipe.transform(this.modelOrderTrainers.date, 'shortDate');

    this.orderService.saveOrder(order).subscribe(() => {
        this.isCreated = true;
        this.done = false;
        this.doneOrder = true;
        this.progressService.ref().complete();
        window.scroll(0, 500);
      },
      error => {
        this.orderError = error.error;
        this.isCreated = false;

      });
  }
}




