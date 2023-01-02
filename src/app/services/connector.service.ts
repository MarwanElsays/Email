import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { BackendCommunicatorService } from './backend-communicator.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService{

  constructor(private backend: BackendCommunicatorService) {}

  hideMenu: boolean = false;
  folders: string[] = [];
  // folderName: string = '';
  activeUserID: number = 0;
  changeFolderName = new EventEmitter<string>();
  
  toggleMenu() {
    this.hideMenu = !this.hideMenu;
  }
  
  changeFolderNameEmit(name: string) {
    this.changeFolderName.emit(name);
  }

}

// getFolderNames() {
//   let folders: string[] = ['help'];
//   // this.backend.getCustomFolders(this.activeUserID).subscribe((f) => {
//   //   folders = f;
//   //   console.log(folders);
//   // });
//   return folders;
//}

// get allMails() {
//   return this._allMails;
// }


// sendMail = new EventEmitter<Email>();

// emitEmail(email:Email){
//   this.sendMail.emit(email);
// }