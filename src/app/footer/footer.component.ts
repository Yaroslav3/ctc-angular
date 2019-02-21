import {Component, OnInit} from '@angular/core';
import {User} from '../shared/model/User.model';
import {UserService} from '../shared/service/user.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.adaptive.component.scss']
})
export class FooterComponent implements OnInit {

  user: User;
  text = 'Corporate Training Company';

  /**
   * url for hidden  footer
   * **/
  private names: string[] = ['/login'];

  /***
   * to display footer
   * **/
  protected login = true;

  constructor(private userService: UserService, private location: Location) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe((s: User) => {
      this.user = s;
    });
  }


  /***
   * hidden footer
   ***/
  public auth(): boolean {
    if (this.names[0] === this.location.path()) {
      return this.login = false;
    }
    return this.login = true;
  }

}
