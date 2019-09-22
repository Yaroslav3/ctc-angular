import {Component, OnInit, TemplateRef} from '@angular/core';
import {Trainers} from '../../../shared/model/Trainers.model';
import {TrainersService} from '../../../shared/service/trainers.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../common';
import {StartService} from '../../../shared/service/start.service';

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
              private progress: NgProgress,
              private store: Store<fromRoot.AppState>,
              private startService: StartService) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    // this.getAllTrainers();
    this.store.select(fromRoot.getAllTrainers).subscribe((trainers: Trainers) => {
      this.trainers = trainers;
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(id: number) {
    this.serviceTrainers.adminDeleteTrainers(id).subscribe(() => {
       this.startService.getTrainersAdmin();
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
