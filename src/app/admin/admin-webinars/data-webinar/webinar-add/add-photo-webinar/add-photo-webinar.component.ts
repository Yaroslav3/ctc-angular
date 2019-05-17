import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';
import {PhotoWebinarsService} from '../../../../../shared/service/webinars/photo-webinars.service';
import {HttpEventType} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {WebinarsService} from '../../../../../shared/service/webinars/webinars.service';
import {MessageResponse} from '../../../../../shared/model/MessageResponse.model';

@Component({
  selector: 'app-add-photo-webinar',
  templateUrl: './add-photo-webinar.component.html',
  styleUrls: ['./add-photo-webinar.component.scss', './add-photo-webinar.adaptive.component.scss']
})
export class AddPhotoWebinarComponent implements OnInit, OnDestroy {

  selectFile: File = null;
  id: number;

  alert = false;
  alert2 = false;
  alert3 = false;

  boolUpdatePhoto = true;
  buttonUpdatePhoto = false;
  progressBar = false;
  progress = 0;

  constructor(public photoWebinarsService: PhotoWebinarsService,
              private serviceWebinars: WebinarsService,
              public progressService: NgProgress,
              private idNumber: ActivatedRoute,
              private router: Router) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.checkWebinarPhoto(this.id);
  }

  ngOnDestroy(): void {

  }

  checkWebinarPhoto(id: number) {
    this.progressService.ref().start();
    this.photoWebinarsService.adminPhotoWebinarsCheck(id).subscribe((data: MessageResponse) => {
      if (data.message === 'ok') {
        this.alert2 = true;
        this.boolUpdatePhoto = false;
        this.buttonUpdatePhoto = false;
      }
      if (data.message === 'error') {
        this.boolUpdatePhoto = true;
      }
      if (data.message === 'not found blog') {
        this.alert3 = true;
        this.boolUpdatePhoto = false;
        this.buttonUpdatePhoto = false;
      }
    });
    this.progressService.ref().complete();
  }

  /**
   * selectPeriodDate file
   * **/
  onFileSelector(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      console.log(this.selectFile.size);
      this.boolUpdatePhoto = false;
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

      this.photoWebinarsService.adminCreatePhotoWebinars(fd, this.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressBar = true;
          this.progress = +Math.round(event.loaded / event.total * 100);
          this.progressService.ref().complete();
          this.progressBar = false;


          this.boolUpdatePhoto = false;
          this.buttonUpdatePhoto = false;
          this.alert = true;

        } else if (event.type === HttpEventType.Response) {

        }
      }, error1 => {
        window.alert('error');
      });
    }
  }


  /**
   * redirect to Webinars
   * **/
  finish() {
    this.router.navigate(['admin', 'webinars', 'data-webinars']);
  }

  /**
   * redirect to edit Webinars
   * **/
  changePhoto() {
    this.router.navigate(['admin', 'webinars', 'webinars-edit', this.id]);
  }

  back() {
    this.router.navigate(['admin', 'webinars', 'data-webinars']);
  }

}
