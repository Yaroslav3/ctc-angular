import {Component, OnInit} from '@angular/core';
import {RoomRentalService} from '../shared/service/roomRental/room-rental.service';
import {Room} from '../shared/model/room/Room.model';
import {RoomArticle} from '../shared/model/room/RoomArticle.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';


@Component({
  selector: 'app-room-rental',
  templateUrl: './room-rental.component.html',
  styleUrls: ['./room-rental.component.scss']
})


export class RoomRentalComponent implements OnInit {
  room: Room;
  article: RoomArticle;

  timeChose = [{time: '09:00 - 10:00'}, {time: '10:00 - 11:00'}];

  editorConfig: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
    height: 'auto',
    defaultFontSize: '5',
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


  constructor(
    private roomRentalService: RoomRentalService) {
  }


  ngOnInit() {
    window.scroll(0, 0);
    this.allRoom();
  }


  /**
   * all room show;
   * **/
  allRoom() {
    this.roomRentalService.getAllRoom().subscribe((data: Room) => {
      this.room = data;
    });
  }
}
