import {Component, OnInit, TemplateRef} from '@angular/core';
import {TrainingsService} from '../../../shared/service/trainings.service';
import {Trainings} from '../../../shared/model/Trainings.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-data-trainings',
  templateUrl: './data-trainings.component.html',
  styleUrls: ['./data-trainings.component.scss', './data-trainings.adaptive.component.scss']
})
export class DataTrainingsComponent implements OnInit {
  trainings: Trainings;
  modalRef: BsModalRef;
  message: string;
  boolPagination = false;
  p: any;


  constructor(private serviceTrainings: TrainingsService, private modalService: BsModalService, private router: Router,
              public progress: NgProgress) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAllTrainings();
  }


  private getAllTrainings() {
    this.progress.ref().start();
    this.serviceTrainings.adminGetAllTrainings().subscribe((data: Trainings) => {
      this.trainings = data;

      if (Object.keys(data).length >= 5) {
        this.boolPagination = true;
      }
      this.progress.ref().complete();
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: number) {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.serviceTrainings.adminDeleteTrainings(id).subscribe(() => {
        this.getAllTrainings();
      }
    );
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  onClick(trainings: Trainings) {
    this.router.navigate(['admin', 'trainings', 'trainings-edit', trainings.id]);
  }
}
