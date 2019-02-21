import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FontsJsonFileService {

  private pathFileJson = './assets/fonts.json';


  constructor(private http: HttpClient) {
  }


  /**
   *  get fonts in the file json
   *  @path ./assets/fonts.json.
   * **/

  getFontJsonFile() {
    return this.http.get(this.pathFileJson);
  }

}
