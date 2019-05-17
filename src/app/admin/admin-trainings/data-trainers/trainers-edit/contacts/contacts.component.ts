import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../../../../../shared/service/contacts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Contacts} from '../../../../../shared/model/Contacts.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  private id: number;
  contacts: Contacts;
  contactsModel: Contacts = new Contacts();


  constructor(private idNumber: ActivatedRoute, private contactsService: ContactsService,
              public progressService: NgProgress,
              private modalService: NgbModal, private router: Router) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getOneContacts(this.id);
  }


  /***
   *  get one Contacts
   * ****/
  getOneContacts(id: number) {
    this.progressService.ref().start();
    this.contactsService.adminGetOneContacts(id).subscribe((data: Contacts) => {
      this.contacts = data;
      this.progressService.ref().complete();
    }, error => {
      window.alert('error');
    });
  }

  /***
   *  open modal window add Contacts
   * ***/
  openModalAddContacts(view) {
    this.modalService.open(view);
  }

  /***
   *  create Contacts
   * ***/
  createContacts(contacts: Contacts) {
    contacts.idTrainers = this.id;
    this.progressService.ref().start();
    this.contactsService.adminCreateContacts(contacts).subscribe((data) => {
      this.modalService.dismissAll(2);
      this.progressService.ref().complete();
      this.getOneContacts(this.id);
    }, error => {
      window.alert('error');
    });
  }

  /***
   * open modal Window delete all Contacts
   * ****/
  openModalDelete(view) {
    this.modalService.open(view);
  }


  /***
   *  delete all Contacts
   * ***/
  contactsDelete(id: number) {
    this.progressService.ref().start();
    this.contactsService.adminDeleteContacts(id).subscribe(() => {
      this.modalService.dismissAll(2);
      this.progressService.ref().complete();
      this.getOneContacts(this.id);
    }, error => {
      window.alert('error');
    });
  }

  /***
   * open modal Window edit Contacts
   * ****/
  openModalEditContacts(view) {
    this.modalService.open(view);
  }


  /***
   *  update  Contacts
   * ***/
  updateContacts(contacts: Contacts, id: number) {
    contacts.idTrainers = this.id;
    contacts.id = id;
    this.progressService.ref().start();
    this.contactsService.adminUpdateContacts(contacts).subscribe((data: Contacts) => {
      this.contacts = data;
      this.modalService.dismissAll(2);
      this.progressService.ref().complete();
    }, error => {
      window.alert('error');
    });
  }

  back() {
    this.router.navigate(['admin', 'trainings', 'trainers-edit', this.id]);
  }
}
