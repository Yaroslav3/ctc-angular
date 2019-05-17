import {Component, OnInit, TemplateRef} from '@angular/core';
import {Trainers} from '../../../shared/model/Trainers.model';
import {TrainersService} from '../../../shared/service/trainers.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-data-trainers',
  templateUrl: './data-trainers.component.html',
  styleUrls: ['./data-trainers.component.scss', './data-trainers.adaptive.component.scss']
})
export class DataTrainersComponent implements OnInit {
  trainers: Trainers;
  modalRef: BsModalRef;
  message: string;

  p: any;


  constructor(private serviceTrainers: TrainersService,
              private modalService: BsModalService,
              private router: Router,
              private progress: NgProgress) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAllTrainers();
  }


  private getAllTrainers() {

    this.progress.ref().start();
    this.serviceTrainers.adminGetAllTrainers().subscribe((data: Trainers) => {
      this.trainers = data;
      this.progress.ref().complete();
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(id: number) {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.serviceTrainers.adminDeleteTrainers(id).subscribe(() => {
        this.getAllTrainers();
      }
    );
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  onClick(trainers: Trainers) {
    this.router.navigate(['admin', 'trainings', 'trainers-edit', trainers.id]);
  }
}
