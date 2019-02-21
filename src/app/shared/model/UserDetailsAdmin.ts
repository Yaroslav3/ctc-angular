import {Roles} from './Rolles.model';


export class UserDetailsAdmin {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: Array<Roles>;
  date: Date;
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;

  constructor(name?: string, username?: string, email?: string, roles?: Array<Roles>, date?: Date, enabled?: boolean,
              accountNonLocked?: boolean, accountNonExpired?: boolean, credentialsNonExpired?: boolean) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.date = date;
    this.enabled = enabled;
    this.accountNonLocked = accountNonLocked;
    this.accountNonExpired = accountNonExpired;
    this.credentialsNonExpired = credentialsNonExpired;
  }

}
