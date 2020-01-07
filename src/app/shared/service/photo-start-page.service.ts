import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {eAdminPhotoStartPage, eHomePhoto, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoStartPageService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  /**
   * get all for customer photo Start Page
   * **/
  customerPhotoStartPageGetAll() {
    return this.http.get(`${this.host + eHomePhoto.apiUrlPhotoPageStartGetAll}`);
  }

  /**
   * get one for customer photo Start Page
   * **/
  customerPhotoStartPageGetOneForName(name: string){
    console.log(name);
    return this.http.get(
      `${this.host + eHomePhoto.apiUrlPhotoNamePhotoPage}/${name}`, {responseType: 'blob'}
    );
  }

  /**
   * get one for customer photo Start Page
   * **/
  customerPhotoStartPageGetOne(id: number) {
    return this.http.get(
      `${this.host + eHomePhoto.apiUrlPhotoPageStartGetOne}/${id}`, {responseType: 'blob'}
    );
  }


  /**
   * get all photo Start Page  for admin panel
   * **/

  adminPhotoStartPageGetAll() {
    return this.http.get(
      `${this.host + eAdminPhotoStartPage.adminUrlPhotoPageStartGetAll}`);
  }

  /**
   * get one photo Start Page for admin panel
   * **/
  adminPhotoStartPageGetOne(id: number) {
    return this.http.get(
      `${this.host + eAdminPhotoStartPage.adminUrlPhotoPageStartGetOne}/${id}`, {responseType: 'blob'}
    );
  }

  /**
   * create photo Start Page for admin panel
   * ***/
  adminPhotoStartPageCreate(fd: FormData, name: string) {
    return this.http.post(
      `${this.host + eAdminPhotoStartPage.adminUrlPhotoPageStartCreate}/${name}`, fd, {responseType: 'blob'}
    );
  }

  /**
   * update photo Start Page   for admin panel
   * **/
  adminPhotoStartPageUpdate(id: number, name: string, fd: FormData) {
    return this.http.put(
      `${this.host + eAdminPhotoStartPage.adminUrlPhotoPageStartUpdate}/${id}/${name}`, fd
    );
  }

  /**
   *  delete photo Start Page for admin panel
   * **/
  adminPhotoStartPageDelete(id: number) {
    return this.http.delete(
      `${this.host + eAdminPhotoStartPage.adminUrlPhotoPageStartDelete}/${id}`
    );
  }

}

