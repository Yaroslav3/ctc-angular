import {Authorities} from './Authorities.model';

export class UserDetails {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: string[];
  date: Date;
  authorities: Authorities;
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;


  constructor(name?: string, username?: string, email?: string, roles?: string[], date?: Date, authorities?: Authorities, enabled?: boolean,
              accountNonLocked?: boolean, accountNonExpired?: boolean, credentialsNonExpired?: boolean) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.date = date;
    this.authorities = authorities;
    this.enabled = enabled;
    this.accountNonLocked = accountNonLocked;
    this.accountNonExpired = accountNonExpired;
    this.credentialsNonExpired = credentialsNonExpired;
  }
}
