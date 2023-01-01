import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  private _ID: number = 0;
  private _hideMenu: boolean = false;
  // private _allMails: Email[] = [];
  // private _users: User[] = [new User("ali@m.com", "pwp"), 
  //                           new User('marwan@m.com', "wow")];
  // private _activeUser: User = this._users[0];
  
  toggleMenu() {
    this._hideMenu = !this._hideMenu;
  }
  
  incrementID() {
    this._ID++;
  }

  get ID() {
    return this._ID;
  }

  get hideMenu() {
    return this._hideMenu;
  }

  
}




// sendMail = new EventEmitter<Email>();

// emitEmail(email:Email){
//   this.sendMail.emit(email);
// }