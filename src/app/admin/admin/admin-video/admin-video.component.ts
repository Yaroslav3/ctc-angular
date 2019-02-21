import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VideoService} from '../../../shared/service/video.service';
import {HttpEventType} from '@angular/common/http';
import {Video} from '../../../shared/model/Video.model';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-admin-video',
  templateUrl: './admin-video.component.html',
  styleUrls: ['./admin-video.component.scss']
})
export class AdminVideoComponent implements OnInit {

  /**
   * btn add video
   * ***/
  addVideo: boolean;


  /**
   * show video
   * ***/
  video: Video;

  /**
   * select file save photo
   * **/
  selectFileSave: File = null;

  /**
   * hides button upload video (save video)
   * **/
  buttonSaveVideo = false;

  /**
   * hides button update video (update video)
   * **/
  buttonUpdateVideo = false;

  /**
   * hides button save video
   * **/
  btnChooseSave = true;


  /**
   * progress bar (hidden end show)
   * **/
  progressBar = false;


  /**
   * hides button update photo
   * **/
  btnChooseUpdate = true;


  /**
   * progress variable upload video
   * **/
  progress = 0;

  /**
   *  validate video update
   * ***/
  validateVideo: boolean;

  /**
   *  size file
   * **/
  fileSize: any;

  constructor(private modalService: NgbModal, private videoService: VideoService, public progressService: NgProgress) {
  }

  ngOnInit() {
    this.adminGetAllVideo();

  }


  addPhotoVideo(view) {
    this.modalService.open(view);
    if (this.selectFileSave != null) {
      this.buttonSaveVideo = false;
      this.btnChooseSave = true;
      this.validateVideo = false;
    } else {
      this.btnChooseSave = true;
    }
  }


  onFileSelectorSave(event) {
    this.selectFileSave = event.target.files[0] as File;
    if (this.selectFileSave.size > 59_000_000) {
      this.fileSize = (this.selectFileSave.size / Math.pow(1024, 2)).toFixed(1);
      this.validateVideo = true;
      this.buttonSaveVideo = false;
      this.btnChooseSave = true;
    } else {
      this.buttonSaveVideo = true;
      this.btnChooseSave = false;
    }

  }

  /**
   * get all video show
   * **/
  adminGetAllVideo() {
    this.progressService.ref().start();
    this.videoService.adminGetAllVideo().subscribe((data: Video) => {
      this.video = data;
      if (data[0] == null) {
        this.addVideo = true;
      } else {
        {
          this.addVideo = false;
        }
      }
      this.progressService.ref().complete();
    });
  }

  /**
   * create video
   * **/
  adminCreateVideo() {
    if (this.selectFileSave != null) {
      const fd = new FormData();
      fd.append('file', this.selectFileSave, this.selectFileSave.name);

      this.videoService.adminCreateVideo(fd).subscribe(event => {
        this.buttonSaveVideo = false;
        if (event.type === HttpEventType.UploadProgress) {
          this.progressBar = true;
          this.progress = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          this.progressBar = false;
          this.modalService.dismissAll(2);
          this.adminGetAllVideo();
        }
      });
    }
  }

  /**
   * update video
   * ***/
  openModalUpdateVideo(event) {
    this.modalService.open(event);
    if (this.selectFileSave != null) {
      this.buttonUpdateVideo = false;
      this.validateVideo = false;
    }
    this.btnChooseUpdate = true;
    this.validateVideo = false;
  }

  onFileSelectorUpdate(event) {
    this.selectFileSave = event.target.files[0] as File;
    if (this.selectFileSave.size > 59_000_000) {
      console.log(this.selectFileSave.size);
      this.fileSize = (this.selectFileSave.size / Math.pow(1024, 2)).toFixed(1);
      this.validateVideo = true;
      this.buttonUpdateVideo = false;
      this.btnChooseUpdate = true;
    } else {
      this.buttonUpdateVideo = true;
      this.btnChooseUpdate = false;
    }
  }

  onAdminUpdateVideo(id: number) {
    if (this.selectFileSave != null) {
      const fd = new FormData();
      fd.append('file', this.selectFileSave, this.selectFileSave.name);
      this.videoService.adminUpdateVideo(id, fd).subscribe(event => {
        this.buttonUpdateVideo = false;
        if (event.type === HttpEventType.UploadProgress) {
          this.progressBar = true;
          this.progress = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          this.progressBar = false;
          this.modalService.dismissAll(2);
          this.adminGetAllVideo();
        }
      });
    }
  }

  /**
   * delete video
   * **/
  openModalDeleteVideo(event) {
    this.modalService.open(event);
  }

  adminDeleteVideo(id: number) {
    this.videoService.adminDeleteVideo(id).subscribe(data => {

      this.modalService.dismissAll(2);
      this.adminGetAllVideo();
    }, error1 => {
      window.alert('remove error');
      this.modalService.dismissAll(2);
    });
  }
}


