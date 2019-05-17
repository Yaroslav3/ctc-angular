import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Room} from '../../../../../shared/model/room/Room.model';
import {RoomRentalService} from '../../../../../shared/service/roomRental/room-rental.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomPhotoService} from '../../../../../shared/service/roomRental/room-photo.service';
import {HttpEventType} from '@angular/common/http';
import {PhotoRoom} from '../../../../../shared/model/room/PhotoRoom.model';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  id: number;
  nameRoom: string;
  photo: any[];

  isBtnUpload: boolean;

  /**
   * selectPeriodDate file
   * **/
  selectFile: File = null;

  /**
   * progress number
   * **/
  progressNumber = 0;
  progressBar: boolean;


  constructor(private idNumber: ActivatedRoute,
              private roomRentalService: RoomRentalService,
              private roomPhotoService: RoomPhotoService,
              private progressService: NgProgress,
              private router: Router) {
    idNumber.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAllPhoto(this.id);
    this.getOneRoom(this.id);
  }


  /**
   * fet one room;
   * **/
  getOneRoom(id: number) {
    this.roomRentalService.adminOneRoom(id).subscribe((data: Room) => {
      this.nameRoom = data.nameRoom;
    });
  }

  getAllPhoto(id: number) {
    this.progressService.ref().start();
    this.roomPhotoService.adminFetAllPhoto(id).subscribe((data: PhotoRoom) => {
      this.photo = Array(data);
      if (Object.keys(this.photo[0]).length >= 5) {
        this.isBtnUpload = true;
      } else {
        this.isBtnUpload = false;
      }
      this.progressService.ref().complete();
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {

      this.selectFile = event.target.files[0];
      const fd = new FormData();
      fd.append('file', event.target.files[0]);

      this.roomPhotoService.adminCreatePhoto(fd, this.id).subscribe((data) => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progressBar = true;
          this.progressNumber = +Math.round(data.loaded / data.total * 100);
        } else if (data.type === HttpEventType.Response) {
          this.progressBar = false;
          this.getAllPhoto(this.id);
        }
      });
    }
  }

  /**
   * delete photo room;
   * **/
  deletePhoto(id: number) {
    this.roomPhotoService.adminDeletePhoto(id).subscribe(data => {
      this.getAllPhoto(this.id);
    }, error => {
      window.alert(error.message);
    });
  }

  /**
   * redirect to finish photo room;
   * ***/
  finish() {
    this.router.navigate(['admin', 'room', 'rental', 'data']);
  }
}
