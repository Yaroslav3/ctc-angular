import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminArticleTrainings, environment} from '../../../../environments/environment';
import {TrainingArticle} from '../../model/trainings/TrainingArticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleTrainingsService {


  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   *  get One Article
   * **/
  adminOneArticle(id: number) {
    return this.http.get(`${this.host + eAdminArticleTrainings.adminUrlGetOneArticle}/${id}`);
  }

  /**
   *  get status
   * **/
  adminStstusArticle(id: number) {
    return this.http.get(`${this.host + eAdminArticleTrainings.adminUrlGetStatusArticle}/${id}`);
  }


  /**
   *  update Article
   * ***/
  adminUpdateArticle(article: TrainingArticle) {
    return this.http.put(`${this.host + eAdminArticleTrainings.adminUrlGetUpdateArticle}`, article);
  }

  /**
   *  create Article
   * ***/
  adminCreateArticle(article: TrainingArticle, id: number) {
    return this.http.post(`${this.host + eAdminArticleTrainings.adminUrlGetCreateArticle}/${id}`, article);
  }
}
