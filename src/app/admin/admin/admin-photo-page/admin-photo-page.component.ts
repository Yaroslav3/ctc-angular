import {Component, OnInit} from '@angular/core';
import {PhotoStartPageService} from '../../../shared/service/photo-start-page.service';
import {PhotoStartPage} from '../../../shared/model/PhotoStartPage';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../../auth/service/token-storage.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-admin-photo-page',
  templateUrl: './admin-photo-page.component.html',
  styleUrls: ['./admin-photo-page.component.scss', './admin-photo-page.adaptive.component.scss']
})
export class AdminPhotoPageComponent implements OnInit {


  /**
   *  get all model PhotoStartPage
   * **/
  modelPhotoStartPage: PhotoStartPage;


  /**
   *  save model PhotoStartPage
   * **/
  modelPhotoSave: PhotoStartPage = new PhotoStartPage();

  /**
   *  update model PhotoStartPage
   * **/
  modelPhoto: PhotoStartPage;


  /**
   * selectPeriodDate file save photo
   * **/
  selectFileSave: File = null;


  /**
   * selectPeriodDate file update photo
   * **/
  selectFileUpdate: File = null;


  /**
   * hides button upload photo (update photo)
   * **/
  buttonUpdatePhoto = false;


  /**
   * hides button upload photo (save photo)
   * **/
  buttonSavePhoto = false;


  /**
   * hides button save photo
   * **/
  btnChooseSave = true;


  /**
   * hides button update photo
   * **/
  btnChooseUpdate = true;


  /**
   * show image
   * **/
  imageToShow: any;

  /**
   *  show role user
   * **/
  roles: string[] = [];
  p: number;


  constructor(private photoStartPage: PhotoStartPageService, private modalService: NgbModal,
              private tokenStorage: TokenStorageService, public progress: NgProgress) {
  }

  ngOnInit() {
    this.getAllPhotoStartPage();
    this.roles = this.tokenStorage.getAuthorities();
  }


  /**
   * open modal window add page
   * **/
  addPhotoPage(view) {
    this.modalService.open(view);
  }

  /**
   * get all Start Photo Page
   * **/
  getAllPhotoStartPage() {
    this.progress.ref().start();
    this.photoStartPage.adminPhotoStartPageGetAll().subscribe((data: PhotoStartPage) => {
      this.modelPhotoStartPage = data;
      this.progress.ref().complete();
    });
  }

  onFileSelectorSave(event) {
    this.selectFileSave = event.target.files[0] as File;
    this.buttonSavePhoto = true;
    this.btnChooseSave = false;
  }


  /**
   * get one Start Photo Page
   * ***/
  getOnePhotoStartPage(id: number) {
    this.photoStartPage.adminPhotoStartPageGetOne(id).subscribe(data => {
      this.createImageFromBlob(data);
    });
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
   * create  Start Photo Page
   * ***/
  createPhotoStartPage(photo: PhotoStartPage) {
    if (this.selectFileSave != null) {
      const fd = new FormData();
      fd.append('file', this.selectFileSave, this.selectFileSave.name);
      this.photoStartPage.adminPhotoStartPageCreate(fd, photo.namePage).subscribe(event => {
        console.log(event);
        this.buttonSavePhoto = false;
        this.btnChooseSave = true;
        window.alert('susses');
        this.modalService.dismissAll(2);
        this.getAllPhotoStartPage();
      }, error2 => {
        window.alert('error');
      });
    }
  }

  /**
   * update Start Photo Page
   * **/
  onFileSelectorUpdate(event) {
    this.selectFileUpdate = event.target.files[0] as File;
    this.buttonUpdatePhoto = true;
    this.btnChooseUpdate = false;

  }

  openModalUpdatePhoto(view, model) {
    this.modalService.open(view);
    this.modelPhoto = model;
  }

  updatePhotoStartPage(photo: PhotoStartPage) {
    const fd = new FormData();
    fd.append('file', this.selectFileUpdate, this.selectFileUpdate.name);
    this.photoStartPage.adminPhotoStartPageUpdate(photo.id, photo.namePage, fd).subscribe((event) => {
      this.buttonUpdatePhoto = false;
      this.btnChooseUpdate = true;
      window.alert('susses');
      this.modalService.dismissAll(2);
      this.getAllPhotoStartPage();
    }, error1 => {
      window.alert('error');
    });
  }

  /**
   * delete Start Photo Page
   * **/
  openModalDeletePhoto(view) {
    this.modalService.open(view);

  }

  /**
   * remove photo on click button (removePhotoBtn)
   * ***/
  removePhotoBtn(model) {
    this.photoStartPage.adminPhotoStartPageDelete(model.id).subscribe((data) => {
      window.alert('remove susses');
      this.modalService.dismissAll(2);
      this.getAllPhotoStartPage();
    }, error2 => {
      window.alert('error');
    });
  }

}
