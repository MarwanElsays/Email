import { Injectable } from '@angular/core';
import { Email } from '../Classes/Email';
import { Gender, User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  private _ID: number = 0;
  private _hideMenu: boolean = false;
  private _allMails: Email[] = [];
  private _users: User[] = [new User("Ali", "Mones", new Date(2003, 2, 3), Gender.male, "ali@m.com", "pwp"), 
                            new User("Marwan", "Mostafa", new Date(2002, 1, 28), Gender.male, 'marwan@m.com', "wow")];
  private _activeUser: User = this._users[0];
  
  toggleMenu() {
    this._hideMenu = !this._hideMenu;
  }
  
  incrementID() {
    this._ID++;
  }
    
  get users() {
    return this._users;
  }

  get ID() {
    return this._ID;
  }

  get hideMenu() {
    return this._hideMenu;
  }

  get activeUser() {
    return this._activeUser;
  }

  get allMails() {
    return this._allMails;
  }

  
}




// sendMail = new EventEmitter<Email>();

// emitEmail(email:Email){
//   this.sendMail.emit(email);
// }