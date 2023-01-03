import { Injectable } from '@angular/core';
import { Email } from '../Classes/Email';
import { BackendCommunicatorService } from './backend-communicator.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService{

  constructor(private backend: BackendCommunicatorService) {}

  hideMenu: boolean = false;
  folders: string[] = [];
  activeUserID: number = parseInt(<string>window.localStorage.getItem('userID'));
  allMails: Email[] = [];
  
  toggleMenu() {
    this.hideMenu = !this.hideMenu;
  }
}