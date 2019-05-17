import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {TrainersService} from '../../../../shared/service/trainers.service';
import {Trainers} from '../../../../shared/model/Trainers.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';
import {PhotoService} from '../../../../shared/service/photo.service';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {NgProgress} from '@ngx-progressbar/core';
import {TrainerTrainings} from '../../../../shared/model/TrainerTrainings.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TrainerTrainingsService} from '../../../../shared/service/trainer-trainings.service';
import {Contacts} from '../../../../shared/model/Contacts.model';


@Component({
  selector: 'app-trainers-edit',
  templateUrl: './trainers-edit.component.html',
  styleUrls: ['./trainers-edit.component.scss', './trainers-edit.adaptive.component.scss']
})
export class TrainersEditComponent implements OnInit {

  fonts = [];

  constructor(private idNumber: ActivatedRoute, private serviceTrainers: TrainersService,
              private photoService: PhotoService, private fontService: FontsJsonFileService,
              public progressService: NgProgress, private modalService: NgbModal,
              private trainerTrainingService: TrainerTrainingsService, private router: Router) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  id: number;
  trainers: Trainers = new Trainers();
  trainerTrainings: TrainerTrainings = new TrainerTrainings();
  trainerTrainingsModel: TrainerTrainings = new TrainerTrainings();
  qualification: TrainerTrainings;
  contacts: Contacts;

  selectFile: File = null;
  imageToShow: any;
  boolUpdatePhoto = true;
  buttonUpdatePhoto = false;
  progressBar = false;
  progress = 0;
  p: any;


  isImageLoading = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '18rem',
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

  onFileSelector(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      this.boolUpdatePhoto = false;
      this.buttonUpdatePhoto = true;
    }
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  /**
   *  get one photo
   * ***/
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
      console.log(data);
      this.trainerTrainings = data.trainerTrainings;
      this.contacts = data.contacts;
      this.progressService.ref().complete();
    });
  }


  onClickUpdate(trainers: Trainers) {
    console.log(trainers);
    this.progressService.ref().start();
    this.serviceTrainers.adminUpdateTrainers(trainers, this.id).subscribe((data) => {
      window.alert('success');
      this.progressService.ref().complete();
    }, error => {
      window.alert('error');
    });
  }


  /***
   * modal window remove Trainer Skills
   ***/
  modalDeleteSkills(view) {
    this.modalService.open(view);
  }

  /***
   *  delete skills Trainer
   * ***/
  skillsDelete(id: number) {
    this.progressService.ref().start();
    this.trainerTrainingService.adminDeleteTrainerTrainings(id).subscribe(() => {
      this.modalService.dismissAll(2);
      this.progressService.ref().complete();
      this.getOneTrainers(this.id);
    });
  }


  /***
   * modal window create Trainer Skills
   ***/
  openModalAddSkills(view) {
    this.modalService.open(view);
  }


  /***
   *  create skills Trainer
   * ***/
  createSkills(trainerSkills: TrainerTrainings) {
    this.progressService.ref().start();
    this.trainerTrainingService.adminCreateTrainerTrainings(this.id, trainerSkills).subscribe(() => {
      this.modalService.dismissAll(2);
      this.progressService.ref().complete();
      this.getOneTrainers(this.id);
    }, error => {
      window.alert('error');
    });
  }

  /***
   * modal window edit Trainer Skills
   ***/
  modalEditSkills(view) {
    this.modalService.open(view);
  }

  /***
   *  update skills Trainer
   * ***/
  updateSkills(id: number, trainerSkills: string) {
    this.progressService.ref().start();
    this.qualification = new TrainerTrainings(trainerSkills, id);
    this.trainerTrainingService.adminUpdateTrainerTrainings(id, this.qualification).subscribe(() => {
      this.modalService.dismissAll(2);
      this.progressService.ref().complete();
      this.getOneTrainers(this.id);
    }, error => {
      window.alert('error');
    });
  }

  contactsPage() {
    this.router.navigate(['admin', 'trainings', 'contacts', this.id]);
  }
}
