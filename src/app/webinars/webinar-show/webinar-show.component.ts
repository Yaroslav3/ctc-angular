import {Component, OnInit} from '@angular/core';
import {Webinars} from '../../shared/model/webinars/Webinars.model';
import {WebinarsService} from '../../shared/service/webinars/webinars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {HttpClient} from '@angular/common/http';
import {TransferCountPersonService} from '../../shared/service/share/transfer/transferCountPerson.service';
import {TransferWebinarService} from '../../shared/service/share/transfer/transfer-webinar.service';
import {WebinarCountStatuses} from '../../shared/model/webinars/WebinarCountStatuses.model';

@Component({
  selector: 'app-webinar-show',
  templateUrl: './webinar-show.component.html',
  styleUrls: ['./webinar-show.component.scss', './webinar-show.adaptive.component.scss']
})
export class WebinarShowComponent implements OnInit {

  webinar: Webinars;
  liqPay = 'test';

  webinarCountStatuses: WebinarCountStatuses;
  count = 0;

  arrNames: number[];
  d = 1;

  id: number;


  editorConfig: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
    height: 'auto',
    defaultFontSize: '5',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(private webinarService: WebinarsService, private idNumber: ActivatedRoute, private http: HttpClient,
              private route: Router,
              private transferService: TransferCountPersonService,
              private transferWebinarService: TransferWebinarService) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getOneWebinar(this.id);
  }


  /**
   *  get one Webinar
   * **/
  getOneWebinar(id: number) {
    this.webinarService.getOne(id).subscribe((data: Webinars) => {
      this.webinar = data;
      this.webinarCountStatuses = data.webinarCountStatuses;
      this.count = Object.keys(this.webinarCountStatuses).length;
    });
  }


  order(webinar) {
    this.transferService.setData(this.d);
    this.transferWebinarService.setData(webinar);
    this.route.navigate(['webinars', 'webinar-order-form']);
  }


  createRange(num) {
    this.arrNames = new Array(num);
    for (let i = 1; i < this.arrNames.length; i++) {
      this.arrNames[i] = i;
    }
    return this.arrNames;
  }

}
