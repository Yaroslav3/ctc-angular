import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomRentalService} from '../../../../../shared/service/roomRental/room-rental.service';
import {RoomPhotoService} from '../../../../../shared/service/roomRental/room-photo.service';
import {NgProgress} from '@ngx-progressbar/core';
import {Room} from '../../../../../shared/model/room/Room.model';
import {PhotoRoom} from '../../../../../shared/model/room/PhotoRoom.model';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-edit-photo-room',
  templateUrl: './edit-photo-room.component.html',
  styleUrls: ['./edit-photo-room.component.scss', './edit-photo-room.adaptive.component.scss']
})
export class EditPhotoRoomComponent implements OnInit {

  id: number;
  nameRoom: string;
  photo: any[];

  isBtnUpload: boolean;

  idUpdate: number;


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


  /**
   * get all photo;
   * ***/
  getAllPhoto(id: number) {
    this.progressService.ref().start();
    this.roomPhotoService.adminFetAllPhoto(id).subscribe((data: PhotoRoom) => {
      this.photo = Array(data);
      this.isBtnUpload = Object.keys(this.photo[0]).length >= 5;
      this.progressService.ref().complete();
    });
  }


  /**
   *  selectPeriodDate file;
   * ***/
  onSelectedFile(event) {
    if (event.target.files.length > 0) {

      const fd = new FormData();
      fd.append('file', event.target.files[0]);

      console.log(fd.get('file'));

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
    console.log(id);
    this.roomPhotoService.adminDeletePhoto(id).subscribe(data => {
      this.getAllPhoto(this.id);
    }, error => {
      window.alert(error.message);
    });
  }

  /**
   *  selectPeriodDate for update photo room;
   * **/
  onUpdateSelectedFile(event, id: number) {
    if (event.target.files.length > 0) {
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.roomPhotoService.adminUpdatePhoto(fd, id).subscribe((data) => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progressBar = true;
          this.progressNumber = +Math.round(data.loaded / data.total * 100);
        } else if (data.type === HttpEventType.Response) {
          this.progressBar = false;
          this.getAllPhoto(this.id);
        }
      }, error1 => {
        window.alert(error1.message);
      });
    }
  }

  /**
   * redirect to finish photo room;
   * ***/
  finish() {
    this.router.navigate(['admin', 'room', 'rental', 'edit-room', this.id]);
  }
}
