import {Component, OnInit} from '@angular/core';
import {Trainers} from '../../shared/model/Trainers.model';
import {ActivatedRoute} from '@angular/router';
import {TrainersService} from '../../shared/service/trainers.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Contacts} from '../../shared/model/Contacts.model';

@Component({
  selector: 'app-show-couch-resume',
  templateUrl: './show-couch-resume.component.html',
  styleUrls: ['./show-couch-resume.component.scss', './show-couch-resume.adaptive.component.scss']
})
export class ShowCouchResumeComponent implements OnInit {

  trainers: Trainers;
  id: number;
  contacts: Contacts;

  constructor(private idNumber: ActivatedRoute,
              private trainersService: TrainersService) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

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
    window.scroll(0, 0);
    this.getOneTrainer(this.id);
  }

  /*****
   *  get One Trainers
   *
   * *****/
  getOneTrainer(id) {
    this.trainersService.getOneTrainers(id).subscribe((date: Trainers) => {
      this.trainers = date;
    });
  }

  /**
   *   all Trainers ho on this Trainings
   * **/
  // getAllTrainersToWorkTrainings() {
  //
  // }
}
