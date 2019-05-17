import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FontsJsonFileService} from '../../../../../shared/service/fonts-json-file.service';
import {ArticleTrainingsService} from '../../../../../shared/service/trainings/article-trainings.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {TrainingsShow} from '../../../../../shared/model/trainings/TrainingsShow.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainingArticle} from '../../../../../shared/model/trainings/TrainingArticle';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  /**
   * get fonts
   * **/
  fonts = [];

  id: number;

  article: TrainingsShow;

  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;


  constructor(private idNumber: ActivatedRoute,
              private fontService: FontsJsonFileService,
              private articleTrainingsService: ArticleTrainingsService,
              private progressService: NgProgress,
              private fb: FormBuilder,
              private router: Router) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }


  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '25rem',
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
    this.createFormGroup();
    window.scroll(0, 0);
    this.getOneArticle(this.id);
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

  getOneArticle(id: number) {
    this.progressService.ref().start();
    this.articleTrainingsService.adminOneArticle(id).subscribe((data: TrainingsShow) => {
      this.article = data;
      this.progressService.ref().complete();
    }, error1 => {

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


  onClickUpdate() {
    this.isSubmitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    console.log('test');

    const article = new TrainingArticle();
    article.description = this.f.description.value;
    article.id = this.article.id;
    this.progressService.ref().start();
    this.articleTrainingsService.adminUpdateArticle(article).subscribe((data: TrainingArticle) => {

      this.article.description = data.description;
      window.alert('susses');
      this.progressService.ref().complete();
    }, error1 => {
      window.alert(error1.message);
    });
  }

  /**
   *  redirect to trainings-edit
   * **/
  back() {
    this.router.navigate(['admin', 'trainings', 'trainings-edit', this.id]);
  }
}
