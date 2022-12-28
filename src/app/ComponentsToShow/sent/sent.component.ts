import { ConnectorService } from './../../services/connector.service';
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Email } from 'src/app/Classes/Email';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})

export class SentComponent {

  constructor(private s: ConnectorService) { }
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  private _user: User = this.s.activeUser;

  get user() {
    return this._user;
  }
}
