import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Trainers} from '../../../../shared/model/Trainers.model';
import {TrainersService} from '../../../../shared/service/trainers.service';
import {PhotoService} from '../../../../shared/service/photo.service';
import {Trainings} from '../../../../shared/model/trainings/Trainings.model';
import {HttpEventType} from '@angular/common/http';
import {Router} from '@angular/router';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-trainers-add',
  templateUrl: './trainers-add.component.html',
  styleUrls: ['./trainers-add.component.scss', './trainers-add.adaptive.component.scss']
})
export class TrainersAddComponent implements OnInit {

  constructor(private serviceTrainers: TrainersService,
              private photoService: PhotoService, private router: Router, private fontService: FontsJsonFileService,
              public progressService: NgProgress) {

  }

  id: number;
  orderError: Trainings;
  isCreated = false;
  isImageLoading = false;

  blockTrainerText = true;
  trainers: Trainers = new Trainers();
  selectFile: File = null;
  imageToShow: any;
  boolSavePhoto = false;
  buttonUpdatePhoto = false;
  progressBar = false;
  progress = 0;

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


  ngOnInit() {
    this.getFonts();
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


  /**
   * create trainer
   * ***/
  onClickNext(trainers: Trainers) {
    console.log(trainers);
    this.progressService.ref().start();
    this.serviceTrainers.adminCreateTrainers(trainers).subscribe((data: Trainers) => {
        this.id = data.id;
        this.blockTrainerText = false;
        this.boolSavePhoto = true;
        this.progressService.ref().complete();
      },
      error => {
        this.progressService.ref().complete();
        this.orderError = error.error;
        this.isCreated = false;
      });

  }


  onFileSelector(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      this.boolSavePhoto = false;
      this.buttonUpdatePhoto = true;
    }
  }

  /**
   * create file
   * **/
  onCreate() {
    this.progressService.ref().start();
    if (this.selectFile != null) {
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      this.photoService.adminCreateTrainersPhoto(fd, this.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.buttonUpdatePhoto = false;
          this.progressBar = true;
          this.progress = +Math.round(event.loaded / event.total * 100);
          this.progressService.ref().complete();
          window.alert('susses');
          this.router.navigate(['admin', 'trainings', 'data-trainers']);

        } else if (event.type === HttpEventType.Response) {
          this.progressBar = false;
          this.boolSavePhoto = true;

        }
      }, error1 => {
        window.alert('error');
      });
    }
  }


}
