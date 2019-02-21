import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Trainings} from '../../../../shared/model/Trainings.model';
import {TrainingsService} from '../../../../shared/service/trainings.service';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-trainings-add',
  templateUrl: './trainings-add.component.html',
  styleUrls: ['./trainings-add.component.scss', './trainings-add.adaptive.component.scss']
})
export class TrainingsAddComponent implements OnInit {


  constructor(private serviceTrainings: TrainingsService, private fontService: FontsJsonFileService, public progress: NgProgress) {
  }

  private orderError: Trainings;
  private isCreated = false;

  done = true;
  doneSave = false;
  fonts = [];

  trainings: Trainings = new Trainings();


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
    window.scroll(0, 0);
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


  noClickAddTraining(trainings: Trainings) {
    this.progress.ref().start();
    this.serviceTrainings.adminCreateTrainings(trainings).subscribe(() => {
        this.doneSave = true;
        this.done = false;
        window.scroll(0, 0);
        this.progress.ref().complete();
      },
      error => {
        this.orderError = error.error;
        this.isCreated = false;
      });
  }
}
