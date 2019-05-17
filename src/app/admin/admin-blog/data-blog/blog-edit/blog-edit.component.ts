import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../../shared/service/blog/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Blog} from '../../../../shared/model/blog/Blog.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FontsJsonFileService} from '../../../../shared/service/fonts-json-file.service';
import {HttpEventType} from '@angular/common/http';
import {NgProgress} from '@ngx-progressbar/core';
import {FirstPhotoBlogService} from '../../../../shared/service/blog/first-photo-blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  id: number;

  blogModel: Blog;
  imageToShow: any;

  progressBar = false;
  progress = 0;


  /**
   * selectPeriodDate file
   * *  **/
  selectFile: File = null;

  /**
   *  for validation.
   *  * ***/
  blogForm: FormGroup;

  idChoosePhoto = true;
  idUpdatePhoto = false;


  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  fonts = [];


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
              private idNumber: ActivatedRoute,
              private fontService: FontsJsonFileService,
              private progressService: NgProgress,
              private firstPhotoBlogService: FirstPhotoBlogService,
              private fb: FormBuilder,
              private router: Router) {
    idNumber.params.subscribe(p => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.getFonts();
    this.getBlog(this.id);
    this.createFormGroup();
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

  /**
   *  get one Blog
   * **/
  getBlog(id: number) {
    this.blogService.adminGetOneBlog(id).subscribe((data: Blog) => {

        if (data.firstPhotoBlog[0] !== undefined) {
          this.imageToShow = 'data:image/jpg;base64,' + data.firstPhotoBlog[0].photo;
          this.blogModel = data;
        } else {
          this.router.navigate(['admin', 'blog', 'create-photo', this.id]);
        }
      }
    );
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
   *  update Blog
   * **/
  updateBlog() {


    if (this.blogForm.invalid) {
      this.isSubmitted = true;

      console.log(this.blogForm.invalid);
      return;
    }
    const blog = new Blog(this.f.name.value,
      this.f.theme.value,
      this.f.author.value,
      this.f.description.value,
      this.id);
    console.log(blog);

    this.progressService.ref().start();
    this.blogService.adminUpdateBlog(blog).subscribe((data: Blog) => {
      console.log(data);
      this.getBlog(this.id);
      this.progressService.ref().complete();
    }, error => {
      window.alert(error.message);
    });
  }


  /**
   * selectPeriodDate update photo
   * **/
  onFileSelectorUpdate(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      console.log(this.selectFile.size);
      this.idChoosePhoto = false;
      this.idUpdatePhoto = true;
    }
  }

  /**
   * update file
   * **/
  onUpdate() {
    console.log('test');
    this.progressService.ref().start();
    if (this.selectFile != null) {
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      this.firstPhotoBlogService.adminUpdatePhotoBlog(fd, this.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          this.progressBar = true;
          this.progress = +Math.round(event.loaded / event.total * 100);
          this.progressBar = false;
          this.idChoosePhoto = true;
          this.idUpdatePhoto = false;
          this.getBlog(this.id);
          this.progressService.ref().complete();
        }
      }, error => {
        window.alert(error.message);
      });
    }
  }

}
