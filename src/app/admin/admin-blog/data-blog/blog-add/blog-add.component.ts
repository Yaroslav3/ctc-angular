import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../../shared/service/blog/blog.service';
import {Blog} from '../../../../shared/model/blog/Blog.model';
import {NgProgress} from '@ngx-progressbar/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {

  fonts = [];

  /**
   *  for validation.
   * ***/
  blogForm: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  /**
   *  hidden input (name, theme, author, description) if success validation this false;
   * **/
  isHiddenInput = true;


  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '20rem',
    fonts: this.fonts,
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

  constructor(private blogService: BlogService,
              public progressService: NgProgress,
              private fontService: FontsJsonFileService,
              private fb: FormBuilder,
              private route: Router) {
  }

  ngOnInit() {
    this.createFormGroup();
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
    return this.blogForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      theme: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(80)]],
      description: ['', [Validators.required]],
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.blogForm.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.blogForm.reset();
  }


  /**
   * create Blog
   * **/
  createBlog() {

    if (this.blogForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.progressService.ref().start();
    this.blogService.adminCreateBlog(
      new Blog(this.f.name.value, this.f.theme.value, this.f.author.value, this.f.description.value))
      .subscribe((data: Blog) => {
        this.isHiddenInput = false;

        this.route.navigate(['admin', 'blog', 'create-photo', data.id]);
        console.log(data);
        window.scroll(0, 0);
        this.progressService.ref().complete();
      });
  }

}

