import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageResponse} from '../../../../../shared/model/MessageResponse.model';
import {NgProgress} from '@ngx-progressbar/core';
import {FirstPhotoBlogService} from '../../../../../shared/service/blog/first-photo-blog.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-add-blog-first-photo',
  templateUrl: './add-blog-first-photo.component.html',
  styleUrls: ['./add-blog-first-photo.component.scss']
})
export class AddBlogFirstPhotoComponent implements OnInit {

  selectFile: File = null;
  id: number;

  alert = false;
  alert2 = false;
  alert3 = false;

  boolUpdatePhoto = true;
  buttonUpdatePhoto = false;
  progressBar = false;
  progress = 0;

  constructor(private idNumber: ActivatedRoute,
              private firstPhotoBlogService: FirstPhotoBlogService,
              public progressService: NgProgress,
              private router: Router) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.checkWebinarPhoto(this.id);
  }


  checkWebinarPhoto(id: number) {
    this.progressService.ref().start();
    this.firstPhotoBlogService.adminGetCheckPhotoBlog(id).subscribe((data: MessageResponse) => {
      console.log(data.message);

      if (data.message === 'ok') {
        this.alert2 = true;
        this.boolUpdatePhoto = false;
        this.buttonUpdatePhoto = false;
      }
      if (data.message === 'error') {
        this.boolUpdatePhoto = true;
      }
      if (data.message === 'not found blog') {
        this.alert3 = true;
        this.boolUpdatePhoto = false;
        this.buttonUpdatePhoto = false;
      }
    });
    this.progressService.ref().complete();
  }


  /**
   * selectPeriodDate file
   * **/
  onFileSelector(event) {
    this.selectFile = event.target.files[0] as File;
    if (this.selectFile != null) {
      console.log(this.selectFile.size);
      this.boolUpdatePhoto = false;
      this.buttonUpdatePhoto = true;

    }
  }

  /**
   * create file
   * **/
  onCreate() {

    this.progressService.ref().start();
    if (this.selectFile != null) {
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);

      this.firstPhotoBlogService.adminCreatePhotoBlog(fd, this.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressBar = true;
          this.progress = +Math.round(event.loaded / event.total * 100);
          this.progressService.ref().complete();
          this.progressBar = false;


          this.boolUpdatePhoto = false;
          this.buttonUpdatePhoto = false;
          this.alert = true;

        } else if (event.type === HttpEventType.Response) {

        }
      }, error => {
        window.alert(error.message);
      });
    }
  }


  /**
   * redirect to Blog
   * **/
  finish() {
    this.router.navigate(['admin', 'blog', 'data-blog']);
  }

  /**
   * redirect to edit Blog
   * **/
  changePhoto() {
    this.router.navigate(['admin', 'blog', 'blog-edit', this.id]);
  }

  back() {
    this.router.navigate(['admin', 'blog', 'data-blog']);
  }
}
