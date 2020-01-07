import {Component, OnInit} from '@angular/core';
import {TransferCountPersonService} from '../../../../shared/service/share/transfer/transferCountPerson.service';
import {Router} from '@angular/router';
import {TransferWebinarService} from '../../../../shared/service/share/transfer/transfer-webinar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebinarOrder} from '../../../../shared/model/webinars/WebinarOrder.model';
import {WebinarOrderService} from '../../../../shared/service/webinars/webinar-order.service';
import {NgProgress} from '@ngx-progressbar/core';
import {NumericValueType, RxwebValidators} from '@rxweb/reactive-form-validators';
import {LiqPayOrder} from '../../../../shared/model/webinars/LiqPayOrder.model';

@Component({
  selector: 'app-order-form-webinar',
  templateUrl: './order-form-webinar.component.html',
  styleUrls: ['./order-form-webinar.component.scss', './order-form-webinar.adaptive.component.scss']
})
export class OrderFormWebinarComponent implements OnInit {
  countPerson = this.transferService.getData();
  webinar = this.transferWebinarService.getData();
  id: number;
  price: number;


  /**
   *  for validation.
   * ***/
  formLiqPay: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;


  /**
   *  show and hidden block liqPay.
   * **/
  isLiqPay = true;


  /**
   *  show and hidden block Payment Method
   * **/
  isPaymentMethod = false;


  /**
   *  show and hidden style.
   * **/
  isLiqPayOne = true;
  isLiqPayTwo = false;
  isLiqPayTree = false;

  liqPayOrder = new LiqPayOrder();


  constructor(private transferService: TransferCountPersonService,
              private transferWebinarService: TransferWebinarService,
              private route: Router,
              private fb: FormBuilder,
              private webinarOrderService: WebinarOrderService,
              public progressService: NgProgress) {
  }

  ngOnInit() {
    this.redirect();
    this.id = this.webinar.id;
    this.price = this.webinar.price * this.countPerson;
    this.createFormGroup();

  }

  redirect() {
    if (this.webinar === undefined) {
      this.route.navigate(['webinars']);
    }
  }

  /**
   *  click back
   * **/
  back() {
    this.route.navigate(['webinars', 'webinar-show', this.id]);
  }


  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.formLiqPay = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10),
        RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: false})]],
    });
  }


  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.formLiqPay.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.formLiqPay.reset();
  }


  /**
   * liqPay Invoice Webinar
   * ***/
  orderWebinar() {
    this.isSubmitted = true;

    if (this.formLiqPay.invalid) {
      return;
    }

    this.isLiqPay = false;
    this.isPaymentMethod = true;
    this.isLiqPayOne = false;
    this.isLiqPayTwo = true;
  }


  liqPayInvoiceWebinar() {
    const webinarOrder = new WebinarOrder(
      this.f.name.value,
      null,
      this.f.email.value,
      this.f.phone.value,
      this.webinar.countPerson = this.countPerson
      , this.webinar.price = this.price,
      this.webinar.currency, this.webinar.name,
      this.webinar.theme, this.webinar.id
    );

    this.progressService.ref().start();
    this.webinarOrderService.createWebinarOrder(webinarOrder).subscribe((data: LiqPayOrder) => {
      this.liqPayOrder = data;
      this.isLiqPayTwo = false;
      this.isLiqPayTree = true;
      this.isPaymentMethod = false;
      this.progressService.ref().complete();
    });

  }


}
