import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from '../../../shared/service/user-details.service';
import {UserDetails} from '../../../shared/model/UserDetails';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from '../../../shared/service/account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {SignUpInfo} from '../../auth/model/SignUpInfo';
import {AuthService} from '../../auth/service/auth.service';
import {TokenStorageService} from '../../auth/service/token-storage.service';
import {UserDetailsAdmin} from '../../../shared/model/UserDetailsAdmin';
import {MessageResponse} from '../../../shared/model/MessageResponse.model';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-admin-user-service',
  templateUrl: './admin-user-service.component.html',
  styleUrls: ['./admin-user-service.component.scss', './admin-user-service.adaptive.component.scss']
})
export class AdminUserServiceComponent implements OnInit {

  userDetails: UserDetails;

  userDetailsAdmin: UserDetailsAdmin;

  /**
   *  for validation.
   * ***/
  passwordForm: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  /**
   *  message error change.
   * **/
  isErrorPassword = false;

  /**
   *  alert message success change.
   * **/
  isSuccessPassword = false;

  /**
   *  alert message error delete user account.
   * **/
  isErrorDeleteUser = false;

  /**
   *  alert message success delete user account.
   * **/
  isSuccessDeleteUser = false;

  /**
   *  show role
   * **/
  roles: string[] = [];

  /**
   *  counts user
   * ***/
  count: number;


  /**
   * registration
   * ****/
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  isErrorRegistration = false;
  isSuccessRegistration = false;

  constructor(private modalService: NgbModal, private userDetailsService: UserDetailsService,
              private fb: FormBuilder, private accountService: AccountService, private authService: AuthService,
              private tokenStorage: TokenStorageService, public progress: NgProgress) {
  }


  ngOnInit() {
    this.getUserDetails();
    this.createFormGroup();
    this.roles = this.tokenStorage.getAuthorities();
    this.getAllUser();
  }


  /**
   *  open modal view change password
   * ***/

  openChangePassword(event) {
    this.createFormGroup();
    this.modalService.open(event);

  }


  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.passwordForm = this.fb.group({
      passwordOld: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat: ['', [Validators.required, Validators.minLength(6), RxwebValidators.compare({fieldName: 'password'})]]
    });
  }


  /***
   *  FormGroup controls
   * ***/

  get f() {
    return this.passwordForm.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.passwordForm.reset();
  }

  /**
   *  get all show user details
   * **/

  getUserDetails() {
    this.progress.ref().start();
    this.userDetailsService.getUserDetails().subscribe((data: UserDetails) => {
      this.userDetails = data;
      this.progress.ref().complete();
    });
  }


  /***
   *  change password user account
   * **/

  clickChangePassword() {
    this.isSubmitted = true;

    if (this.passwordForm.invalid) {
      return;
    }
    this.accountService.changePassword(this.f.passwordOld.value, this.f.password.value).subscribe((data: MessageResponse) => {
      if (data.message === 'error') {
        this.isErrorPassword = true;
        this.isSuccessPassword = false;
        return;
      } else if (data.message === 'success') {
        this.isSuccessPassword = true;
        this.isErrorPassword = false;
      }
    });
    this.modalService.dismissAll(1);
    this.revert();
  }

  /**
   *  show all registered users
   * **/
  getAllUser() {
    this.progress.ref().start();
    this.accountService.adminUrlGetAllUserAdmin().subscribe((data: UserDetailsAdmin) => {
      this.userDetailsAdmin = data;
      this.count = Object.keys(data).length;
      this.progress.ref().complete();
    });
  }


  /**
   *  registration open modal window
   * ***/

  openRegistration(view) {
    this.modalService.open(view);
  }


  /***
   *  registration user
   * ***/

  onRegistration() {
    this.signupInfo = new SignUpInfo(this.form.name, this.form.username, this.form.email, this.form.password, [this.form.role]);

    this.authService.signUp(this.signupInfo).subscribe(() => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.isSuccessRegistration = true;
        this.modalService.dismissAll(1);
        this.getAllUser();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.isErrorRegistration = true;
      }
    );
  }

  /**
   *  delete user
   * ***/
  openModalDeleteUser(view) {
    this.modalService.open(view);
  }

  removeUser(model) {
    this.accountService.adminUrlDeleteUser(model.id).subscribe((data: MessageResponse) => {
        if (data.message === 'error') {
          this.modalService.dismissAll(1);
          this.isSuccessDeleteUser = false;
          this.isErrorDeleteUser = true;
          return;
        } else if (data.message === 'success') {
          this.modalService.dismissAll(1);
          this.isSuccessDeleteUser = true;
          this.isErrorDeleteUser = false;
          this.getAllUser();
        }
      },
      error1 => {
        this.modalService.dismissAll(1);
        this.isErrorDeleteUser = true;
      });
  }

}


