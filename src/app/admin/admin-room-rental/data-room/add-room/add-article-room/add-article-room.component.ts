import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FontsJsonFileService} from '../../../../../shared/service/fonts-json-file.service';
import {RoomRentalService} from '../../../../../shared/service/roomRental/room-rental.service';
import {Room} from '../../../../../shared/model/room/Room.model';
import {RoomArticle} from '../../../../../shared/model/room/RoomArticle.model';
import {RoomArticleService} from '../../../../../shared/service/roomRental/room-article.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgProgress} from '@ngx-progressbar/core';
import {Status} from '../../../../../shared/model/status/Status.model';

@Component({
  selector: 'app-add-article-room',
  templateUrl: './add-article-room.component.html',
  styleUrls: ['./add-article-room.component.scss']
})
export class AddArticleRoomComponent implements OnInit {

  fonts = [];
  id: number;
  nameRoom: string;
  roomArticle: RoomArticle = new RoomArticle();

  roomError: RoomArticle;
  isCreated = false;

  isCheck: boolean;


  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    showToolbar: true,
    height: '22rem',
    defaultFontSize: '5',
    fonts: this.fonts,
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

  constructor(private idNumber: ActivatedRoute,
              private fontService: FontsJsonFileService,
              private roomRentalService: RoomRentalService,
              private roomArticleService: RoomArticleService,
              private fb: FormBuilder,
              private router: Router,
              private progress: NgProgress) {

    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.checkRoom(this.id);
    this.getOneRoom(this.id);
    this.getFonts();
    this.createFormGroup();
  }

  /**
   *  get fonts in the file json
   *  @path ./assets/fonts.json
   * **/
  getFonts() {
    this.fontService.getFontJsonFile().subscribe(result => {
      for (let i = 0; i < Object.keys(result).length; i++) {
        this.fonts[i] = result[i];
      }
    });
  }

  /**
   * check by id room rental
   * **/
  checkRoom(id: number) {
    this.roomArticleService.adminCheck(id).subscribe((data: Status) => {
      console.log(data);
      this.isCheck = data.message === 'ok';
    });
  }


  /**
   * fet one room;
   * **/
  getOneRoom(id: number) {
    this.roomRentalService.adminOneRoom(id).subscribe((data: Room) => {
      this.nameRoom = data.nameRoom;
    });
  }

  /***
   *  Form Group for validation
   * **/
  createFormGroup() {
    return this.formGroup = this.fb.group({
      descriptionArticle: ['', [Validators.required, Validators.maxLength(20000)]],
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.formGroup.controls;
  }

  /**
   *  reset
   * **/

  revert() {
    this.formGroup.reset();
  }


  /**
   * create article room;
   * **/
  createArticle() {

    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }
    this.progress.ref().start();
    const article = new RoomArticle();
    article.descriptionArticle = this.f.descriptionArticle.value;
    this.roomArticleService.adminCreateArticle(this.id, article).subscribe(data => {
      this.progress.ref().complete();
      this.router.navigate(['admin', 'room', 'rental', 'add-prise-room', this.id]);
    }, error => {
      this.progress.ref().complete();
      this.roomError = error.error;
      this.isCreated = true;
    });
  }

  /**
   * redirect to edit;
   * ****/
  redirect() {
    console.log('test');
  }
}
