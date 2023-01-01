import { ConnectorService } from './../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent {

  constructor(private s: ConnectorService) { }
  private _user: number = this.s.activeUserID;
  faRotateRight = faRotateRight;
  faTrash = faTrash;

  get user() {
    return this._user;
  }


}
