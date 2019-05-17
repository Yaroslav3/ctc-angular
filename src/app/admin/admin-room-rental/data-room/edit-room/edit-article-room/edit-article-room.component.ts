import {Component, OnInit} from '@angular/core';
import {RoomArticle} from '../../../../../shared/model/room/RoomArticle.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ActivatedRoute, Router} from '@angular/router';
import {FontsJsonFileService} from '../../../../../shared/service/fonts-json-file.service';
import {RoomRentalService} from '../../../../../shared/service/roomRental/room-rental.service';
import {RoomArticleService} from '../../../../../shared/service/roomRental/room-article.service';
import {NgProgress} from '@ngx-progressbar/core';
import {Room} from '../../../../../shared/model/room/Room.model';

@Component({
  selector: 'app-edit-article-room',
  templateUrl: './edit-article-room.component.html',
  styleUrls: ['./edit-article-room.component.scss']
})
export class EditArticleRoomComponent implements OnInit {

  fonts = [];
  id: number;
  nameRoom: string;
  roomArticle: RoomArticle = new RoomArticle();

  roomError: RoomArticle;
  isCreated = false;


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
   * fet one room;
   * **/
  getOneRoom(id: number) {
    this.roomRentalService.adminOneRoom(id).subscribe((data: Room) => {
      this.nameRoom = data.nameRoom;
      console.log(data.articleRoom);
      this.roomArticle = data.articleRoom[0];
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
   * update article room;
   * **/
  updateArticle() {

    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      return;
    }
    this.progress.ref().start();
    const article = new RoomArticle();
    article.descriptionArticle = this.f.descriptionArticle.value;
    article.id = this.roomArticle.id;
    this.roomArticleService.adminUpdateArticle(this.id, article).subscribe(data => {
      this.getOneRoom(this.id);
      this.progress.ref().complete();
    }, error => {
      this.progress.ref().complete();
      this.roomError = error.error;
      this.isCreated = true;
    });
  }

  /**
   * redirect to edit;
   * ****/
  back() {
    this.router.navigate(['admin', 'room', 'rental', 'edit-room', this.id]);
  }
}

