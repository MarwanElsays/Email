import { Component } from '@angular/core';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Classes/user';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  constructor(private s: ConnectorService) {}
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  styleIt: boolean = true;
  private _user: User = this.s.activeUser;

  get user() {
    return this._user;
  }
}
