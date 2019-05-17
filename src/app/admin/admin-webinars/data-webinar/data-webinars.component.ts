import {Component, OnInit} from '@angular/core';
import {Webinars} from '../../../shared/model/webinars/Webinars.model';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {WebinarsService} from '../../../shared/service/webinars/webinars.service';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-data-webinar',
  templateUrl: './data-webinars.component.html',
  styleUrls: ['./data-webinars.component.scss']
})
export class DataWebinarsComponent implements OnInit {

  webinars: Webinars;
  p: any;

  constructor(private serviceWebinars: WebinarsService,
              private modalService: NgbModal, private router: Router,
              public progressService: NgProgress) {
  }

  ngOnInit() {
    this.getAllWebinars();
  }

  getAllWebinars() {
    this.progressService.ref().start();
    this.serviceWebinars.adminGetAllWebinars().subscribe((data: Webinars) => {
      this.webinars = data;
      console.log(data);

      for (let i = 0; i < Object.keys(data).length; i++) {
        console.log(data[i].webinarCountStatuses);
      }
      this.progressService.ref().complete();
    });
  }


  /**
   * open modal window delete
   * ***/
  openDeleteWindow(view) {
    this.modalService.open(view);
  }

  /**
   * delete Webinar
   * **/
  removeWebinar(id: number) {
    this.serviceWebinars.adminDeleteWebinars(id).subscribe((data) => {
      this.modalService.dismissAll(1);
      this.getAllWebinars();
    });
  }


  /**
   *  redirect edit Webinar
   * ***/
  onClickEdit(id: number) {
    this.router.navigate(['admin', 'webinars', 'webinars-edit', id]);
  }

}
