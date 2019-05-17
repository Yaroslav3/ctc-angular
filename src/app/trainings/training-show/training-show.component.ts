import {Component, OnInit} from '@angular/core';
import {TrainersService} from '../../shared/service/trainers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingsService} from '../../shared/service/trainings/trainings.service';
import {Trainings} from '../../shared/model/trainings/Trainings.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Trainers} from '../../shared/model/Trainers.model';
import {NgProgress} from '@ngx-progressbar/core';
import {FilePDFService} from '../../shared/service/trainings/file-pdf.service';
import {TrainingsShow} from '../../shared/model/trainings/TrainingsShow.model';

@Component({
  selector: 'app-training-show',
  templateUrl: './training-show.component.html',
  styleUrls: ['./training-show.component.scss', './training-show.adaptive.component.scss']
})
export class TrainingShowComponent implements OnInit {

  id: number;
  selectFile: File = null;
  training: TrainingsShow;
  trainers: Trainers;


  constructor(public progressService: NgProgress,
              private idNumber: ActivatedRoute,
              private serviceTrainers: TrainersService,
              private serviceTrainings: TrainingsService,
              private pouter: Router,
              private filePDFService: FilePDFService) {
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
    this.getOneTraining(this.id);
    this.getAllTraining(this.id);

  }


  /**
   * get one Trainings
   * **/
  getOneTraining(id: number) {
    this.progressService.ref().start();
    this.serviceTrainings.getOneTrainings(id).subscribe((data: TrainingsShow) => {
      this.training = data;
      this.progressService.ref().complete();
    });
  }

  /**
   * all coaches who are engaged in this training
   * ***/
  getAllTraining(id: number) {
    this.serviceTrainers.getAllTrainingsSkills(id).subscribe((data: Trainers) => {
      this.trainers = data;
    });
  }

  downloadPDF() {
    console.log('download pdf ....');

    this.filePDFService.downloadPdq(this.id).subscribe((result) => {

      // this.selectFile = result;


      const url = window.URL.createObjectURL(result);
      console.log(url);
      window.open(url);

      console.log('download result ', result);


      // const file = new Blob([res], {type: 'application/pdf'});
      // const fileURL = URL.revokeObjectURL(file.type);
      //
      // console.log(file);
      // window.open(fileURL);
      // const doc = new jsPDF();
      // this.pouter.navigate([fileURL]);
    });
  }


}
