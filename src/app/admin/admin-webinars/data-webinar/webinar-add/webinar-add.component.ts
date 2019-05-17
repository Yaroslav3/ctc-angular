import {Component, OnInit} from '@angular/core';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Webinars} from '../../../../shared/model/webinars/Webinars.model';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {WebinarsService} from '../../../../shared/service/webinars/webinars.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';

@Component({
  selector: 'app-webinar-add',
  templateUrl: './webinar-add.component.html',
  styleUrls: ['./webinar-add.component.scss', './webinar-add.adaptive.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class WebinarAddComponent implements OnInit {

  /**
   *  check for server
   * **/
  webinarError: Webinars;
  isCreated = false;

  /**
   *  for validation.
   * ***/
  webinarForm: FormGroup;


  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  fonts = [];


  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '20rem',
    fonts: this.fonts,
    defaultFontSize: '5',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };


  constructor(private fb: FormBuilder,
              private serviceWebinars: WebinarsService,
              private route: Router,
              private fontService: FontsJsonFileService,
              private progressService: NgProgress) {
  }

  ngOnInit() {
    this.createFormGroup();
    this.getFonts();
  }


  /** private fontService: FontsJsonFileService,
   *  get fonts in the file json
   *  @path ./assets/fonts.json.
   * **/
  getFonts() {
    this.fontService.getFontJsonFile().subscribe(result => {
      for (let i = 0; i < Object.keys(result).length; i++) {
        this.fonts[i] = result[i];
      }
    });
  }


  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.webinarForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      theme: ['', [Validators.required, Validators.maxLength(100)]],
      dateEvent: ['', [Validators.required, Validators.maxLength(19)]],
      timeEvent: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', [Validators.required, Validators.maxLength(19)]],
      currency: ['', [Validators.required, Validators.maxLength(19)]],
      countPerson: ['', [Validators.required, Validators.maxLength(19)]],
      city: ['', [Validators.required, Validators.maxLength(49)]],
      address: ['', [Validators.required, Validators.maxLength(199)]],
      description: ['', [Validators.required]],
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.webinarForm.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.webinarForm.reset();
  }

  /**
   * save Webinar
   * **/
  saveWebinar() {
    this.isSubmitted = true;


    if (this.webinarForm.invalid) {
      console.log(this.webinarForm.invalid);
      return;
    } else {
      const webinar = new Webinars();
      webinar.name = this.f.name.value;
      webinar.theme = this.f.theme.value;
      webinar.dateEvent = this.f.dateEvent.value;
      webinar.timeEvent = this.f.timeEvent.value;
      webinar.price = this.f.price.value;
      webinar.currency = this.f.currency.value;
      webinar.countPerson = this.f.countPerson.value;
      webinar.city = this.f.city.value;
      webinar.address = this.f.address.value;
      webinar.description = this.f.description.value;

      this.progressService.ref().start();
      this.serviceWebinars.adminCreateWebinars(webinar).subscribe((data: Webinars) => {
        this.progressService.ref().complete();
        this.route.navigate(['admin', 'webinars', 'webinar-add', 'photo-add', data.id]);
      }, error => {
        this.webinarError = error.error;
        this.isCreated = false;

      });

    }
  }

}
