import {Component, OnInit} from '@angular/core';
import {WebinarInscription} from '../../../shared/model/webinars/WebinarInscription.model';
import {WebinarsInscriptionsService} from '../../../shared/service/webinars/webinars-inscriptions.service';
import {TokenStorageService} from '../../auth/service/token-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageResponse} from '../../../shared/model/MessageResponse.model';
import {NgProgress} from '@ngx-progressbar/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-inscription-webinar',
  templateUrl: './inscription-webinar.component.html',
  styleUrls: ['./inscription-webinar.component.scss']
})
export class InscriptionWebinarComponent implements OnInit {

  webinar: WebinarInscription;
  inscriptionsModel: WebinarInscription;

  /**
   *  for validation.
   * ***/
  webinarForm: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  /**
   *  show role
   * **/
  roles: string[] = [];


  constructor(private webinarInscriptionsService: WebinarsInscriptionsService,
              private tokenStorage: TokenStorageService,
              private modalService: NgbModal, private  progressService: NgProgress,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.roles = this.tokenStorage.getAuthorities();
    this.getAllWebinarInscription();
  }


  /*********************************************************************************
   *
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.webinarForm = this.fb.group({
      paragraph: ['', [Validators.required, Validators.maxLength(199)]],
      description: ['', [Validators.required, Validators.maxLength(199)]],
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
   *  get all WebinarInscription
   * **/
  getAllWebinarInscription() {
    this.progressService.ref().start();
    this.webinarInscriptionsService.getAllInscriptions().subscribe((date: WebinarInscription) => {
      this.webinar = date;
      this.progressService.ref().complete();
    });
  }


  /**
   * get one WebinarInscription
   *
   * ***/
  getOneInscription(id: number) {
    this.progressService.ref().start();
    this.webinarInscriptionsService.getOneInscriptions(id).subscribe((data: WebinarInscription) => {
      this.inscriptionsModel = data;
      this.progressService.ref().complete();
    }, error => {
      window.alert('error');
    });
  }


  /**
   *  open window delete
   * **/
  openModalDelete(view) {
    this.modalService.open(view);
  }


  /**
   *  delete Inscription
   * **/
  deleteInscription(id: number) {
    this.webinarInscriptionsService.deleteInscriptions(id).subscribe((data: MessageResponse) => {
      this.modalService.dismissAll(1);
      this.getAllWebinarInscription();
    });
  }


  /**
   *  open window create inscriptions
   * **/
  openModalAddInscriptions(view) {
    this.modalService.open(view);
    this.createFormGroup();
  }


  /***
   *  create Inscription Webinar
   * **/
  saveInscription() {
    this.isSubmitted = true;

    if (this.webinarForm.invalid) {
      console.log(this.webinarForm.invalid);
      return;
    } else {
      const inscription = new WebinarInscription(this.f.paragraph.value, this.f.description.value);
      this.progressService.ref().start();
      this.webinarInscriptionsService.createInscriptions(inscription).subscribe((data: WebinarInscription) => {
        this.modalService.dismissAll(1);
        this.progressService.ref().complete();
        this.getAllWebinarInscription();
      });
    }
  }


  /**
   *  open window update inscriptions
   * **/
  openUpdateInscription(view, id: number) {
    this.createFormGroup();
    this.modalService.open(view);
    this.getOneInscription(id);

  }


  /**
   * update Inscription Webinar
   * ***/
  updateInscription() {
    this.isSubmitted = true;

    if (this.webinarForm.invalid) {
      console.log(this.webinarForm.invalid);
      return;
    } else {
      this.progressService.ref().start();
      const inscription = new WebinarInscription(this.f.paragraph.value, this.f.description.value);
      this.webinarInscriptionsService.updateInscriptions(inscription, this.inscriptionsModel.id)
        .subscribe((data: WebinarInscription) => {
          this.modalService.dismissAll(1);
          this.progressService.ref().complete();
          this.getAllWebinarInscription();
        }, error => {
          window.alert('error');
        });
    }
  }
}
