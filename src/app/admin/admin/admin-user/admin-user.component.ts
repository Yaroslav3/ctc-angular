import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../shared/service/user.service';
import {User} from '../../../shared/model/User.model';
import {TokenStorageService} from '../../auth/service/token-storage.service';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss', './admin-user.adaptive.component.scss']
})
export class AdminUserComponent implements OnInit {


  /**
   * model get all user
   * **/
  user: User;

  /**
   * model edit user
   * **/
  modelUser: User = new User();

  /**
   * model create user
   * **/
  modelCreateUser: User = new User();

  /**
   *  show role user
   * **/
  roles: string[] = [];


  constructor(private modalService: NgbModal, private userService: UserService, private tokenStorage: TokenStorageService,
              public progress: NgProgress) {
  }

  ngOnInit() {
    this.getAllUser();
    this.roles = this.tokenStorage.getAuthorities();
  }


  /**
   * modal window add user
   * ***/
  openModalAddUser(view) {
    this.modalService.open(view);
  }

  /**
   * get all user method
   * **/
  getAllUser() {
    this.progress.ref().start();
    this.userService.adminGetAllUser().subscribe((data: User) => {
      this.user = data;
      this.progress.ref().complete();
    });
  }

  /***
   * get one user method
   * **/
  getOneUser(id: number) {
    this.userService.adminGetOneUser(id).subscribe((data: User) => {
      this.modelUser = data;
    });
  }


  /***
   * modal window remove user
   ***/
  openModalRemoveUser(view) {
    this.modalService.open(view);
  }


  /**
   * remove user method
   * ***/
  removeUserBtn(id: number) {
    this.progress.ref().start();
    this.userService.adminDeleteUser(id).subscribe(() => {
      this.modalService.dismissAll(2);
      this.getAllUser();
      this.progress.ref().complete();
    });
  }

  /**
   * modal window edit user
   * ***/
  openModalEditUser(view, id: number) {
    this.modalService.open(view);
    this.getOneUser(id);
  }

  /**
   * update user method
   * ***/
  updateUser(user: User) {
    this.progress.ref().start();
    this.userService.adminUpdateUser(user.id, user).subscribe(() => {
      this.modalService.dismissAll(2);
      this.getAllUser();
      this.progress.ref().complete();
    }, error => {
      window.alert('error -' + error.error.message);
    });
  }

  /**
   * create user
   * ***/
  createUser(user: User) {
    this.progress.ref().start();
    this.userService.adminCreateUser(user).subscribe((data: User) => {

      this.modalService.dismissAll(2);
      this.getAllUser();
      this.progress.ref().complete();
    }, error => {
      window.alert('error -' + error.error.message);
    });
  }

}
