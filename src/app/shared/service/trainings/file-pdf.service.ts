import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eAdminFilePDFTrainers, environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilePDFService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * download pdf customer;
   * **/
  downloadPdq(id: number) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    return this.http.get(`${this.host + environment.apiUrlDownloadPDF}/${id}`,
      {
        headers,
        responseType: 'blob' as 'json'
      });
  }

  /**
   * check pdf file
   * **/
  adminCheckFilePDF(id: number) {
    return this.http.get(`${this.host + eAdminFilePDFTrainers.adminUrlCheckFilePDF}/${id}`);
  }

  /**
   *  create File PDF
   * ***/
  adminCreateFilePDF(fd: FormData, id: number) {
    return this.http.post(`${this.host + eAdminFilePDFTrainers.adminUrlCreateFilePDF}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   *  update File PDF
   * **/
  adminUpdateFilePDF(fd: FormData, id: number) {
    return this.http.put(`${this.host + eAdminFilePDFTrainers.adminUrlUpdateFilePDF}/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
