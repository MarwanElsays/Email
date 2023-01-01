import { ConnectorService } from './../services/connector.service';
import { Component } from '@angular/core';
import { faInbox, faPaperPlane, faTrash, faNoteSticky,faContactBook} from '@fortawesome/free-solid-svg-icons';
import { Route, Router } from '@angular/router';
import { BackendCommunicatorService } from '../services/backend-communicator.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {

  constructor(public s: ConnectorService, public backend: BackendCommunicatorService) { }
  faInbox = faInbox;
  faPaperPlane = faPaperPlane;
  faTrash = faTrash;
  faNoteSticky = faNoteSticky;
  faContactBook = faContactBook;

  changeFolderName(name: string) {
    this.s.changeFolderNameEmit(name);
    // this.r.navigateByUrl();
  }

  Do(): boolean {
    return this.s.hideMenu;
  }

}
