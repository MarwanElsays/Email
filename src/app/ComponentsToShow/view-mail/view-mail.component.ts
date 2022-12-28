import { ConnectorService } from '../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/Classes/Email';
import { ActivatedRoute } from '@angular/router';
import { faRotateRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sent-emails',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.css']
})
export class ViewMailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private s: ConnectorService) { }

  private _faRotateRight = faRotateRight;
  private _faArrowLeft = faArrowLeft;
  private _email?: Email;
  private _root: string = '';

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      const emailID = parseInt(<string>param.get('id'));
      this._root = <string>param.get('root');
      this._email = this.s.allMails.find(x => x.id == emailID);
    })
  }

  get email() {
    return this._email;
  }

  get root() {
    return this._root;
  }

}
