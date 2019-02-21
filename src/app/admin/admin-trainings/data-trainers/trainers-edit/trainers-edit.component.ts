import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {TrainersService} from '../../../../shared/service/trainers.service';
import {Trainers} from '../../../../shared/model/Trainers.model';
import {ActivatedRoute} from '@angular/router';
import {HttpEventType} from '@angular/common/http';
import {PhotoService} from '../../../../shared/service/photo.service';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-trainers-edit',
  templateUrl: './trainers-edit.component.html',
  styleUrls: ['./trainers-edit.component.scss', './trainers-edit.adaptive.component.scss']
})
export class TrainersEditComponent implements OnInit {

  fonts = [];

  constructor(private idNumber: ActivatedRoute, private serviceTrainers: TrainersService,
              private photoService: PhotoService, private fontService: FontsJsonFileService,
              public progressService: NgProgress) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  id: number;
  trainers: Trainers = new Trainers();
  selectFile: File = null;
  imageToShow: any;
  boolUpdatePhoto = true;
  buttonUpdatePhoto = false;
  progressBar = false;
  progress = 0;


  isImageLoading = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '13rem',
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
    this.getOneTrainers(this.id);
    this.getPhoto(this.id);
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

  onFileSelector(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      this.boolUpdatePhoto = false;
      this.buttonUpdatePhoto = true;
    }
  }


  /**
   * update Photo
   ***/
  onUpdatePhoto() {
    if (this.selectFile != null) {
      this.progressService.ref().start();
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      this.photoService.adminUrlTrainersUpdatePhoto(fd, this.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.buttonUpdatePhoto = false;
          this.progressBar = true;
          this.progress = +Math.round(event.loaded / event.total * 100);
          this.getPhoto(this.id);
        } else if (event.type === HttpEventType.Response) {
          this.progressBar = false;
          this.boolUpdatePhoto = true;
          window.alert('susses');
          this.progressService.ref().complete();
        }
      }, error1 => {
        window.alert('error');
      });
    }
  }


  /**
   * get photo Trainers
   * **/
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  getPhoto(id: number) {
    this.progressService.ref().start();
    this.isImageLoading = true;
    this.photoService.adminGetTrainerPhoto(id).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
      this.progressService.ref().complete();
    }, error => {
      this.isImageLoading = false;
    });
  }


  /**
   * get one Trainer
   * **/
  getOneTrainers(id: number) {
    this.progressService.ref().start();
    this.serviceTrainers.adminGetOneTrainers(id).subscribe((data: Trainers) => {
      this.trainers = data;
      this.progressService.ref().complete();
    });
  }


  onClickUpdate(trainers: Trainers) {
    this.progressService.ref().start();
    this.serviceTrainers.adminUpdateTrainers(trainers, this.id).subscribe((data) => {
      window.alert('success');
      this.progressService.ref().complete();
    }, error1 => {
      window.alert('error');
    });
  }
}
