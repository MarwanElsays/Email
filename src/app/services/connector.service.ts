import { Injectable, OnInit } from '@angular/core';
import { Email } from '../Classes/Email';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService implements OnInit{

  ngOnInit(): void {
    /* get id of curr user from service */
  }
  private _ID: number = 0;
  private _hideMenu: boolean = false;
  private _allMails: Email[] = [];
  private _activeUserID: number = 0;
  
  toggleMenu() {
    this._hideMenu = !this._hideMenu;
  }
  
  incrementID() {
    this._ID++;
  }
    
  // get users() {
  //   return this._users;
  // }
  
  set activeUserID(id:number){
    this._activeUserID = id;
  }

  get ID() {
    return this._ID;
  }

  get hideMenu() {
    return this._hideMenu;
  }

  get activeUserID() {
    return this._activeUserID;
  }

  get allMails() {
    return this._allMails;
  }

  
}




// sendMail = new EventEmitter<Email>();

// emitEmail(email:Email){
//   this.sendMail.emit(email);
// }