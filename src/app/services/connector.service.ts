import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Email } from '../Classes/Email';
import { Folder } from '../folder/folder.component';
import { BackendCommunicatorService } from './backend-communicator.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService implements OnInit{

  constructor(private backend: BackendCommunicatorService) {}

  ngOnInit(): void {
    /* get id of curr user from service */
  }
  private _ID: number = 0;
  private _hideMenu: boolean = false;
  private _folderName: string = '';
  private _allMails: Email[] = [];
  private _activeUserID: number = 0;
  changeFolderName = new EventEmitter<string>();
  
  toggleMenu() {
    this._hideMenu = !this._hideMenu;
  }
  
  incrementID() {
    this._ID++;
  }

  changeFolderNameEmit(name: string) {
    this.changeFolderName.emit(name);
  }

  // getFolderNames() {
  //   let folders: string[] = ['help'];
  //   // this.backend.getCustomFolders(this.activeUserID).subscribe((f) => {
  //   //   folders = f;
  //   //   console.log(folders);
  //   // });
  //   return folders;
  // }

  set folderName(name: string) {
    this._folderName = name;
  }

  set activeUserID(id: number) {
    this._activeUserID = id;
  }
  
  get folderName() {
    return this._folderName;
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


  // get allMails() {
  //   return this._allMails;
  // }
  
}




// sendMail = new EventEmitter<Email>();

// emitEmail(email:Email){
//   this.sendMail.emit(email);
// }