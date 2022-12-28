import { ConnectorService } from './../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Email } from 'src/app/Classes/Email';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent {
  constructor(private s:ConnectorService){}
  
  private _user: User = this.s.activeUser;
  faTrash = faTrash;
  faRotateRight = faRotateRight;

  get user() {
    return this._user;
  }
}
