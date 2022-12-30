import { ConnectorService } from './../services/connector.service';
import { Component } from '@angular/core';
import { faInbox, faPaperPlane, faTrash, faNoteSticky,faContactBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {

  constructor(private s: ConnectorService) { }
  faInbox = faInbox;
  faPaperPlane = faPaperPlane;
  faTrash = faTrash;
  faNoteSticky = faNoteSticky;
  faContactBook = faContactBook;

  Do(): boolean {
    return this.s.hideMenu;
  }

}
