import {Component, Input, OnInit} from '@angular/core';
import {Trainers} from '../../shared/model/Trainers.model';
import {ActivatedRoute} from '@angular/router';
import {TrainersService} from '../../shared/service/trainers.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';


@Component({
  selector: 'app-coach-show',
  templateUrl: './coach-show.component.html',
  styleUrls: ['./coach-show.component.scss', './coach-show.adaptive.component.scss']
})

export class CoachShowComponent implements OnInit {

  constructor(private idNumber: ActivatedRoute, public trainersService: TrainersService) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }


  @Input() trainers;
  private id: number;
  protected photo: any;


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

  ngOnInit() {
    scroll(0, 0);
    this.getOneTrainers(this.id);
  }


  getOneTrainers(id) {
    this.trainersService.getOneTrainers(id).subscribe((data: Trainers) => {
      if (this.trainers == null) {
        this.trainers = data;
      }
    });
  }


}
