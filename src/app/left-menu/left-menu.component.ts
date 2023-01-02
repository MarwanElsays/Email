import { ConnectorService } from './../services/connector.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faInbox, faPaperPlane, faTrash, faNoteSticky,faContactBook, faFolder, faFolderPlus, faSave, faX, faPenToSquare, faTachographDigital} from '@fortawesome/free-solid-svg-icons';
import { BackendCommunicatorService } from '../services/backend-communicator.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(public s: ConnectorService, public backend: BackendCommunicatorService, private r: Router) { }
  // folders: string[] = [];
  showEdit: boolean = false;
  @ViewChild('Name') newFolderName?: ElementRef;
  oldFolderName: string = '';
  // icons
  faInbox = faInbox;
  faFolder = faFolder;
  faPaperPlane = faPaperPlane;
  faTrash = faTrash;
  faNoteSticky = faNoteSticky;
  faContactBook = faContactBook;
  faFolderPlus = faFolderPlus;
  faSave = faSave;
  faX = faX;
  faPenToSquare = faPenToSquare;
  
  ngOnInit(): void {
    this.backend.getCustomFolders(this.s.activeUserID).subscribe((folders) => {
      this.s.folders = folders;
    });
  }

  changeFolderName(name: string) {
    this.r.navigate(['/mail-page', {outlets:{main:['folder', name]}}]);
  }


  // folder manipulation //////
  initEdit(currName: string) {
    this.showEdit = true;
    (<HTMLInputElement>this.newFolderName?.nativeElement).value = currName;
    this.oldFolderName = currName;
  }

  async addFolder() {
    const newName = (<HTMLInputElement>this.newFolderName?.nativeElement).value;
    if (this.oldFolderName == '')
      console.log(await lastValueFrom(this.backend.createNewCustomFolder(this.s.activeUserID, newName)));
    else
      await lastValueFrom(this.backend.renameCustomFolder(this.s.activeUserID, this.oldFolderName, newName));
    this.endEdit();
  }

  endEdit() {
    this.showEdit = false;
    this.backend.getCustomFolders(this.s.activeUserID).subscribe((folders) => {
      this.s.folders = folders;
      this.oldFolderName = '';
    });
  }

  async deleteFolder(name: string) {
    await lastValueFrom(this.backend.deleteCustomFolder(this.s.activeUserID, name));
    this.endEdit();
  }
  //////////////////////////////

  Do(): boolean {
    return this.s.hideMenu;
  }

}
