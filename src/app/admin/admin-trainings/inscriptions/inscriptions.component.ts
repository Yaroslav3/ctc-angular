import {Component, OnInit} from '@angular/core';
import {InscriptionsService} from '../../../shared/service/trainings/inscriptions.service';
import {Inscriptions} from '../../../shared/model/Inscriptions.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageResponse} from '../../../shared/model/MessageResponse.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../auth/service/token-storage.service';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss', './inscriptions.adaptive.component.scss']
})
export class InscriptionsComponent implements OnInit {


  /**
   *  model for show Inscriptions.
   * **/
  inscriptions: Inscriptions;

  /**
   *  model for show Inscriptions.
   * **/
  inscriptionsModel: Inscriptions;

  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;


  form: any = {};

  /**
   *  show role
   * **/
  roles: string[] = [];


  count: number;
  p: any;


  constructor(private inscriptionsService: InscriptionsService,
              private modalService: NgbModal,
              private tokenStorage: TokenStorageService,
              private progressService: NgProgress) {
  }

  ngOnInit() {
    this.roles = this.tokenStorage.getAuthorities();
    this.getAll();
  }

  /**
   *  get All Inscriptions.
   * **/

  getAll() {
    this.progressService.ref().start();
    this.inscriptionsService.getAll().subscribe((data: Inscriptions) => {
      this.inscriptions = data;
      for (let i = 0; i < Object.keys(data).length; i++) {
        this.count = i;
      }
      this.progressService.ref().complete();
    });
  }


  /**
   *  get One Inscriptions.
   * **/

  getOne(id: number) {
    this.progressService.ref().start();
    this.inscriptionsService.getOne(id).subscribe((data: Inscriptions) => {
      this.inscriptionsModel = data;
      this.progressService.ref().complete();
    });
  }


  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    this.formGroup = new FormGroup({
      paragraph: new FormControl(this.form.paragraph,
        [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(this.form.description,
        [Validators.required, Validators.maxLength(255)]),
    });
  }

  get paragraph() {
    return this.formGroup.get('paragraph');
  }

  get description() {
    return this.formGroup.get('description');
  }


  /**
   *  open modal view create Inscriptions.
   * **/
  openModalAddInscriptions(view) {
    this.createFormGroup();
    this.modalService.open(view);
  }


  /**
   *  create Inscription.
   * **/
  onCreateInscription() {

    if (this.formGroup.invalid) {
      return;
    }
    this.progressService.ref().start();
    this.inscriptionsService.createInscriptions(new Inscriptions(
      this.formGroup.controls.paragraph.value,
      this.formGroup.controls.description.value)).subscribe(date => {
      this.modalService.dismissAll(1);
      this.getAll();
      this.progressService.ref().complete();
    });

  }

  /**
   *  open edit modal window Inscriptions
   * ***/
  openEditInscriptions(view, id) {
    this.createFormGroup();
    this.modalService.open(view);
    this.getOne(id);
  }


  /**
   *  update Inscriptions
   * ***/
  onUpdateInscription() {
    this.progressService.ref().start();

    this.inscriptionsService.updateInscriptions(
      new Inscriptions(this.formGroup.controls.paragraph.value, this.formGroup.controls.description.value),
      this.inscriptionsModel.id).subscribe(() => {
      this.modalService.dismissAll(1);
      this.getAll();
      this.progressService.ref().complete();
    }, error => {
      window.alert('error');
    });
  }


  /**
   *  open modal view delete.
   ***/
  openModalDelete(view) {
    this.modalService.open(view);
  }


  /**
   *  delete Inscriptions.
   * **/
  deleteInscriptions(elem) {
    this.progressService.ref().start();
    this.inscriptionsService.deleteInscriptions(elem.id).subscribe((data: MessageResponse) => {
      if (data.message === 'success') {
        this.modalService.dismissAll(1);
        this.getAll();
        this.progressService.ref().complete();
      } else if (data.message === 'error') {
        window.alert('error delete');
      }

    }, error => {
      window.alert('error server' + error.message);
    });
  }
}
