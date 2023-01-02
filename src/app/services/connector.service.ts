import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { BackendCommunicatorService } from './backend-communicator.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService{

  constructor(private backend: BackendCommunicatorService) {}

  hideMenu: boolean = false;
  folders: string[] = [];
  activeUserID: number = parseInt(<string>window.localStorage.getItem('userID'));
  changeFolderName = new EventEmitter<string>();
  
  toggleMenu() {
    this.hideMenu = !this.hideMenu;
  }
  
  // changeFolderNameEmit(name: string) {
  //   this.changeFolderName.emit(name);
  // }

}