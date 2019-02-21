import {Component, OnInit} from '@angular/core';
import {TrainingsService} from '../../../../shared/service/trainings.service';
import {ActivatedRoute} from '@angular/router';
import {Trainings} from '../../../../shared/model/Trainings.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';

import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-trainings-edit',
  templateUrl: './trainings-edit.component.html',
  styleUrls: ['./trainings-edit.component.scss', './trainings-edit.adaptive.component.scss']
})
export class TrainingsEditComponent implements OnInit {


  constructor(private idNumber: ActivatedRoute, private serviceTrainings: TrainingsService,
              private fontService: FontsJsonFileService, public progress: NgProgress) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  id: number;
  trainings: Trainings = new Trainings();
  fonts = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '22rem',
    defaultFontSize: '5',
    fonts: this.fonts,
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
    this.getOneTraining(this.id);
    this.getFonts();

  }

  /**
   *  get fonts in the file json
   *  @path ./assets/fonts.json.
   * **/
  getFonts() {
    this.fontService.getFontJsonFile().subscribe(result => {
      for (let i = 0; i < Object.keys(result).length; i++) {
        this.fonts[i] = result[i];
      }
    });

  }


  onClickUpdate(trainings: Trainings) {
    this.progress.ref().start();
    trainings.description = this.trainings.description;
    this.serviceTrainings.adminUpdateTrainings(trainings, this.id).subscribe(() => {
        window.alert('susses');
        this.progress.ref().complete();
      },
      error => {
        window.alert('error -' + error.message);
      }
    );
  }

  getOneTraining(id: number) {
    this.progress.ref().start();
    this.serviceTrainings.adminGetOneTrainings(id).subscribe((data: Trainings) => {
      this.trainings = data;
      this.progress.ref().complete();
    });
  }
}
