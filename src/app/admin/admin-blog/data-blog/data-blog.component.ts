import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../shared/service/blog/blog.service';
import {Blog} from '../../../shared/model/blog/Blog.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {Status} from '../../../shared/model/status/Status.model';

@Component({
  selector: 'app-data-blog',
  templateUrl: './data-blog.component.html',
  styleUrls: ['./data-blog.component.scss']
})
export class DataBlogComponent implements OnInit {
  p: any;
  blog: Blog;
  isListEmpty = false;

  constructor(private blogService: BlogService,
              private modalService: NgbModal,
              private router: Router,
              private progressService: NgProgress) {
  }

  ngOnInit() {
    this.allBlog();
  }

  allBlog() {
    this.blogService.adminAllBlog().subscribe((data: Blog) => {
      console.log(data);
      this.blog = data;
    }, error => {
      this.isListEmpty = true;
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(['admin', 'blog', 'blog-edit', id]);
  }

  openDeleteWindow(view) {
    this.modalService.open(view);
  }

  /**
   * remove Blog
   * **/
  removeBlog(id: number) {
    this.progressService.ref().start();
    this.blogService.adminDeleteBlog(id).subscribe((data: Status) => {
      console.log(data);
      this.allBlog();
      this.modalService.dismissAll(1);
      this.progressService.ref().complete();
    }, error => {
      this.modalService.dismissAll(1);
      window.alert(error.error.message);
    });
  }

}
