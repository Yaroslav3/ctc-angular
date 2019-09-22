import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FontsJsonFileService} from '../../../../../shared/service/fonts-json-file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingsService} from '../../../../../shared/service/trainings/trainings.service';
import {Trainings} from '../../../../../shared/model/trainings/Trainings.model';
import {TrainingArticle} from '../../../../../shared/model/trainings/TrainingArticle';
import {ArticleTrainingsService} from '../../../../../shared/service/trainings/article-trainings.service';
import {NgProgress} from '@ngx-progressbar/core';
import {StartService} from '../../../../../shared/service/start.service';

@Component({
  selector: 'app-add-article-trainings',
  templateUrl: './add-article-trainings.component.html',
  styleUrls: ['./add-article-trainings.component.scss']
})
export class AddArticleTrainingsComponent implements OnInit {

  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  fonts = [];

  id: number;
  trainings: Trainings;


  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '20rem',
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

  constructor(private fontService: FontsJsonFileService,
              private idNumber: ActivatedRoute,
              private fb: FormBuilder,
              private serviceTrainings: TrainingsService,
              private router: Router,
              private startService: StartService,
              private articleTrainingsService: ArticleTrainingsService,
              private progress: NgProgress) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.createFormGroup();
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

  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.formGroup = this.fb.group({
      description: ['', [Validators.required]],
    });
  }

  getOneTraining(id: number) {
    this.serviceTrainings.adminGetOneTrainings(id).subscribe((data: Trainings) => {
      this.trainings = data;
      console.log(data);
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.formGroup.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.formGroup.reset();
  }

  /**
   * create Article
   * ***/
  onClickCreate() {
    this.isSubmitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    console.log('success');

    const articleTraining = new TrainingArticle();
    articleTraining.description = this.f.description.value;

    this.progress.ref().start();
    this.articleTrainingsService.adminCreateArticle(articleTraining, this.id).subscribe((data) => {
      window.alert('success');
      this.startService.getTrainings();
      this.progress.ref().complete();
      this.router.navigate(['admin', 'trainings', 'data-trainings']);
    }, error1 => {
      window.alert(error1.message);
    });
  }


  /**
   *  redirect to all trainings;
   * **/
  back() {
    this.router.navigate(['admin', 'trainings', 'data-trainings']);
  }
}
