import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminBlog, environment} from '../../../../environments/environment';
import {Blog} from '../../model/blog/Blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   *  get all Blog
   *  (admin panel)
   * **/
  adminAllBlog() {
    return this.http.get(this.host + eAdminBlog.adminUrlBlogAll);
  }

  /**
   *  get one Blog
   *  (admin panel)
   * **/
  adminGetOneBlog(id: number) {
    return this.http.get(`${this.host + eAdminBlog.adminUrlBlogOne}/${id}`);
  }

  /**
   *  create Blog
   *  (admin panel)
   * **/
  adminCreateBlog(blog: Blog) {
    return this.http.post(`${this.host + eAdminBlog.adminUrlBlogCreate}`, blog, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  /**
   *  update Blog
   *  (admin panel)
   * **/
  adminUpdateBlog(blog: Blog) {
    return this.http.put(`${this.host + eAdminBlog.adminUrlBlogUpdate}`, blog, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * remove Blog
   * (admin panel)
   * **/
  adminDeleteBlog(id: number) {
    return this.http.delete(`${this.host + eAdminBlog.adminUrlBlogDelete}/${id}`);
  }
}
