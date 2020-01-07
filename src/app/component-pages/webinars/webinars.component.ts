import {Component, OnInit} from '@angular/core';
import {WebinarsService} from '../../shared/service/webinars/webinars.service';
import {WebinarsInscriptionsService} from '../../shared/service/webinars/webinars-inscriptions.service';
import {WebinarInscription} from '../../shared/model/webinars/WebinarInscription.model';
import {Webinars} from '../../shared/model/webinars/Webinars.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.scss', './webinars.admin.component.scss']
})
export class WebinarsComponent implements OnInit {

  inscriptions: WebinarInscription;
  webinars: Webinars;
  count = Array();


  isProgress: boolean;


  constructor(private webinarsService: WebinarsService,
              private webinarsInscriptionsService: WebinarsInscriptionsService,
              private route: Router) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAllInscription();
    this.getAllWebinars();

  }


  /**
   * get all Inscriptions
   * ***/
  getAllInscription() {
    this.webinarsInscriptionsService.getAll().subscribe((date: WebinarInscription) => {
      this.inscriptions = date;
    });
  }


  /**
   * get all Webinars
   * ***/
  getAllWebinars() {
    this.isProgress = true;
      this.webinarsService.getAll().subscribe((data: Webinars) => {
        this.webinars = data;
        for (let i = 0; i < Object.keys(data).length; i++) {
          this.count.push(Object.keys(data[i].webinarCountStatuses).length);
        }
        this.isProgress = false;
        // console.log(this.count);
      });
  }


  noClickWebinars(id) {
    this.route.navigate(['webinars', 'webinar-show', id]);
  }
}
