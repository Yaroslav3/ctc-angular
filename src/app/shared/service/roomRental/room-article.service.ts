import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminRoomArticle, environment} from '../../../../environments/environment';
import {RoomArticle} from '../../model/room/RoomArticle.model';

@Injectable({
  providedIn: 'root'
})
export class RoomArticleService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * admin panel:
   * check status by id room rental
   * **/
  adminCheck(id: number) {
    return this.http.get(`${this.host + eAdminRoomArticle.adminUrlStatus}/${id}`);
  }

  /**
   * create Article room;
   * **/
  adminCreateArticle(id: number, article: RoomArticle) {
    return this.http.post(`${this.host + eAdminRoomArticle.adminUrlCreate}/${id}`, article, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   * admin panel
   * update room article
   * ***/
  adminUpdateArticle(id: number, article: RoomArticle) {
    return this.http.put(`${this.host + eAdminRoomArticle.adminUrlUpdate}/${id}`, article, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
