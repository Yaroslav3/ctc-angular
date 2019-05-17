import {Component, OnInit} from '@angular/core';
import {TrainingsService} from '../../../../shared/service/trainings/trainings.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Trainings} from '../../../../shared/model/trainings/Trainings.model';
import {NgProgress} from '@ngx-progressbar/core';
import {TrainingsPhotoService} from '../../../../shared/service/trainings/trainings-photo.service';
import {HttpEventType} from '@angular/common/http';
import {FilePDFService} from '../../../../shared/service/trainings/file-pdf.service';
import {MessageResponse} from '../../../../shared/model/MessageResponse.model';
import {ArticleTrainingsService} from '../../../../shared/service/trainings/article-trainings.service';
import {Status} from '../../../../shared/model/status/Status.model';


@Component({
  selector: 'app-trainings-edit',
  templateUrl: './trainings-edit.component.html',
  styleUrls: ['./trainings-edit.component.scss', './trainings-edit.adaptive.component.scss']
})
export class TrainingsEditComponent implements OnInit {


  constructor(private idNumber: ActivatedRoute,
              private serviceTrainings: TrainingsService,
              private progress: NgProgress,
              private trainingsPhotoService: TrainingsPhotoService,
              private progressService: NgProgress,
              private filePDFService: FilePDFService,
              private router: Router,
              private articleTrainingsService: ArticleTrainingsService) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  id: number;
  trainings: Trainings = new Trainings();


  /**
   * selectPeriodDate file
   * **/
  selectFile: File = null;

  /**
   * selectPeriodDate file pdf
   * **/
  selectFilePDF: File = null;

  /**
   * image to show
   * **/
  imageToShow: any;

  /**
   * check on empty
   * **/
  idCheckEmptyPhoto: boolean;

  /**
   * save photo button
   * **/
  idSavePhotoTraining: boolean;

  /**
   * update choose photo button
   * **/
  idUpdatePhotoTraining: boolean;

  /**
   * update button
   * **/
  idUpdatePhoto: boolean;


  /**
   * show photo
   * **/
  isShowPhoto: boolean;


  /**
   * choose PDF file
   * **/
  isChooseSavePDF = true;

  /**
   * save PDF file
   * **/
  isSavePDF = false;


  /**
   * choose PDF file
   * **/
  isChooseUpdatePDF = false;


  /**
   * update PDF file
   * **/
  isUpdatePDF = false;

  /**
   * btn article status
   * **/
  isArticle: boolean;

  /**
   * progress bar view
   * **/
  progressBar: boolean;

  /**
   * progress bar  PDF view
   * **/
  isProgressBarPDF: boolean;


  /**
   * progress bar  PDF view
   * **/
  isProgressBarUpdatePDF: boolean;

  /**
   * progress number
   * **/
  progressNumber = 0;

  /**
   * progress number PDF
   * **/
  progressNumberPDF = 0;

  /**
   * progress update  PDF
   * **/
  progressUpdatePDF = 0;


  ngOnInit() {
    this.statusArticle(this.id);
    this.checkPdfFile(this.id);
    this.getOneTraining(this.id);
  }


  /**
   *  check  pdf file
   * ***/
  checkPdfFile(id: number) {
    this.filePDFService.adminCheckFilePDF(id).subscribe((data: MessageResponse) => {
      if (data.message === 'success') {
        this.isChooseSavePDF = false;
        this.isChooseUpdatePDF = true;
      }
    });
  }


  /**
   * update Training
   * ***/
  onClickUpdate(trainings: Trainings) {
    console.log(trainings);
    this.progress.ref().start();
    this.serviceTrainings.adminUpdateTrainings(trainings, this.id).subscribe((data) => {
        window.alert('susses');
        this.progress.ref().complete();
      },
      error => {
        window.alert('error -' + error.message);
      }
    );
  }


  /**
   * get one Training
   * **/
  getOneTraining(id: number) {
    this.progress.ref().start();
    this.serviceTrainings.adminGetOneTrainings(id).subscribe((data: Trainings) => {
      this.trainings = data;

      if (Object.keys(data.photoTrainings).length !== 0) {
        this.idCheckEmptyPhoto = true;
        this.isShowPhoto = true;
        this.idCheckEmptyPhoto = false;
        this.idUpdatePhotoTraining = true;
        this.imageToShow = 'data:image/jpg;base64,' + data.photoTrainings[0].photo;

      } else if (Object.keys(data.photoTrainings).length === 0) {
        this.idCheckEmptyPhoto = true;
        // this.idCheckEmptyPhoto = true;
        this.isShowPhoto = false;

      }
      //
      // if (Object.keys(data.photoTrainings).length === 0) {
      //   this.idCheckEmptyPhoto = true;
      //
      // } else {
      //   this.idCheckEmptyPhoto = false;
      //   this.idUpdatePhotoTraining = true;
      //   this.imageToShow = 'data:image/jpg;base64,' + data.photoTrainings[0].photo;
      // }
      this.progress.ref().complete();
    }, error => {
      window.alert('error');
    });
  }

  // if (data.photoTrainings[0].photo != null) {
  //   console.log(data);
  //   console.log('true');
  //   this.isShowPhoto = true;
  // } else if (Array(data.photoTrainings).length === 0) {
  //   console.log('false');
  //   this.isShowPhoto = false;
  // }


  /**
   * selectPeriodDate save photo Trainers
   * **/
  onFileSelector(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      this.idCheckEmptyPhoto = true;
    }
    this.idSavePhotoTraining = true;
    this.idCheckEmptyPhoto = false;
  }

  /**
   * selectPeriodDate update photo Trainers
   * **/
  onFileSelectorUpdate(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      console.log(this.selectFile.size);
    }
    this.idUpdatePhotoTraining = false;
    this.idUpdatePhoto = true;
  }

  // createImageFromBlob(image: Blob) {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => {
  //     this.imageToShow = reader.result;
  //
  //   }, false);
  //
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

  /**
   * create file
   * **/
  onCreate() {
    this.progressService.ref().start();
    if (this.selectFile != null) {
      console.log('create');
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      this.trainingsPhotoService.adminCreateTrainingsPhoto(fd, this.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.idSavePhotoTraining = false;
          this.progressBar = true;
          this.progressNumber = +Math.round(event.loaded / event.total * 100);
          console.log(this.progressNumber);
          this.progressService.ref().complete();
          this.getOneTraining(this.id);
        } else if (event.type === HttpEventType.Response) {
          this.progressBar = false;
          // this.boolSavePhoto = true;
        }
      }, error1 => {
        window.alert('error');
      });
    }
  }


  /**
   * update  photo file
   * **/
  onUpdate() {
    if (this.selectFile != null) {
      console.log('update');
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      console.log(fd);
      this.trainingsPhotoService.adminUrlUpdateTrainingsPhoto(fd, this.id).subscribe(event => {
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          this.idUpdatePhoto = false;
          this.getOneTraining(this.id);
        }
      });
    }
  }


  /**
   * selectPeriodDate File PDF
   * **/
  onFilePDFSelector(event) {
    this.selectFilePDF = event.target.files[0] as File;
    console.log(this.selectFilePDF.size);
    this.isChooseSavePDF = false;
    this.isSavePDF = true;
  }


  /**
   *  create File PDF
   * **/
  createFilePDF() {
    if (this.selectFilePDF != null) {
      const fd = new FormData();
      fd.append('file', this.selectFilePDF, this.selectFilePDF.name);
      console.log(fd);
      console.log(this.selectFilePDF.size);
      this.filePDFService.adminCreateFilePDF(fd, this.id).subscribe((event) => {
        this.isSavePDF = false;
        if (event.type === HttpEventType.UploadProgress) {
          this.isProgressBarPDF = true;
          this.progressNumberPDF = +Math.round(event.loaded / event.total * 100);
          console.log(this.progressNumberPDF);
        } else if (event.type === HttpEventType.Response) {
          this.isProgressBarPDF = false;
          this.isChooseUpdatePDF = true;
          console.log(event.headers);
        }
      });
    }
  }


  /**
   * selectPeriodDate for update File PDF
   * **/
  onFileUpdatePDFSelector(event) {
    this.selectFilePDF = event.target.files[0] as File;
    this.isChooseUpdatePDF = false;
    this.isUpdatePDF = true;
  }


  /**
   *  update PDF
   * **/
  updateFilePDF() {
    const fd = new FormData();
    fd.append('file', this.selectFilePDF, this.selectFilePDF.name);
    this.filePDFService.adminUpdateFilePDF(fd, this.id).subscribe((event) => {
      this.isUpdatePDF = false;
      if (event.type === HttpEventType.UploadProgress) {
        this.isProgressBarUpdatePDF = true;
        this.progressUpdatePDF = +Math.round(event.loaded / event.total * 100);
      } else if (event.type === HttpEventType.Response) {
        this.isChooseUpdatePDF = true;
        this.isProgressBarUpdatePDF = false;
      }
    }, error1 => {
      window.alert(error1.message);
    });
  }


  /**
   *  status Article
   * ***/
  statusArticle(id: number) {
    this.articleTrainingsService.adminStstusArticle(id).subscribe((data: Status) => {
      if (data.message === 'ok') {
        this.isArticle = true;
      } else if (data.message === 'error') {
        this.isArticle = false;
      }
    });
  }

  /**
   *  redirect to update Article
   * **/
  redirectUpdateArticle() {
    this.router.navigate(['admin', 'trainings', 'update', 'article-trainings', this.id]);
  }

  /**
   *  redirect to create Article
   * **/
  redirectCreateArticle() {
    this.router.navigate(['admin', 'trainings', 'create', 'article-trainings', this.id]);
  }
}
