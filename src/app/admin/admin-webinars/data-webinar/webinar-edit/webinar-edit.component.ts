import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {WebinarsService} from '../../../../shared/service/webinars/webinars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {NgProgress} from '@ngx-progressbar/core';
import {Webinars} from '../../../../shared/model/webinars/Webinars.model';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {PhotoWebinarsService} from '../../../../shared/service/webinars/photo-webinars.service';
import {HttpEventType} from '@angular/common/http';


@Component({
  selector: 'app-webinar-edit',
  templateUrl: './webinar-edit.component.html',
  styleUrls: ['./webinar-edit.component.scss', './data-webinars.adaptive.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class WebinarEditComponent implements OnInit {

  webinarError: Webinars;
  date: Date;
  countStatus: number;


  webinarModel: Webinars;
  pipe = new DatePipe('en-US');

  id: number;
  imageToShow: any;

  progressBar = false;
  progress = 0;


  /**
   * selectPeriodDate file
   * *  **/
  selectFile: File = null;

  /**
   *  for validation.
   *  * ***/
  webinarForm: FormGroup;

  idChoosePhoto = true;
  idUpdatePhoto = false;


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
              private photoWebinarsService: PhotoWebinarsService,
              private route: Router,
              private fontService: FontsJsonFileService, public progressService: NgProgress,
              private idNumber: ActivatedRoute,
              private router: Router) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }


  ngOnInit() {
    this.getOneWebinar(this.id);
    this.createFormGroup();
    this.getFonts();
  }


  /**
   * get one Webinar
   * **/
  getOneWebinar(id: number) {
    this.progressService.ref().start();
    this.serviceWebinars.adminGetOneWebinars(id).subscribe((data: Webinars) => {
      this.webinarModel = data;
      console.log(data);
      this.countStatus = Object.keys(data.webinarCountStatuses).length;

      if (data.photoWebinars[0] !== undefined) {
        this.imageToShow = 'data:image/jpg;base64,' + data.photoWebinars[0].photo;
        this.date = data.dateEvent;
        this.progressService.ref().complete();
      } else {
        this.router.navigate(['admin', 'webinars', 'webinar-add', 'photo-add', this.id]);
      }
    });
  }

  /**
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
      dateEvent: ['dateEvent', [Validators.required, Validators.maxLength(30)]],
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
   *  update Webinar
   * **/
  updateWebinar() {
    this.isSubmitted = true;
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

    if (this.webinarForm.invalid) {
      console.log(this.webinarForm.invalid);
      return;
    } else {
      this.progressService.ref().start();
      this.serviceWebinars.adminUpdateWebinars(this.id, webinar).subscribe((data: Webinars) => {
        window.alert('success');
        this.progressService.ref().complete();
        this.getOneWebinar(this.id);
      }, error => {
        this.webinarError = error.error;
        window.alert('error');
      });
    }

  }


  /**
   * selectPeriodDate update photo
   * **/
  onFileSelectorUpdate(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      console.log(this.selectFile.size);
      this.idChoosePhoto = false;
      this.idUpdatePhoto = true;
    }
  }

  /**
   * update file
   * **/
  onUpdate() {
    this.progressService.ref().start();
    if (this.selectFile != null) {
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      this.photoWebinarsService.adminUrlUpdatePhotoWebinars(fd, this.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          this.progressBar = true;
          this.progress = +Math.round(event.loaded / event.total * 100);
          this.progressBar = false;
          this.idChoosePhoto = true;
          this.idUpdatePhoto = false;
          this.getOneWebinar(this.id);
          this.progressService.ref().complete();
        }
      }, error => {
        window.alert('error');
      });
    }
  }


  /**
   * redirect edit Webinar order details
   ***/
  detailsWebinar() {
    this.route.navigate(['admin', 'webinars', 'webinars-edit', 'webinar-order', this.id]);
  }
}


