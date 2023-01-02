import { ConnectorService } from '../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/Classes/Email';
import { ActivatedRoute } from '@angular/router';
import { faRotateRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';

@Component({
  selector: 'app-sent-emails',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.css']
})
export class ViewMailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private s: ConnectorService, private backend: BackendCommunicatorService) { }

  faRotateRight = faRotateRight;
  faArrowLeft = faArrowLeft;
  email!: Email;
  root: string = '';

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      const emailID = parseInt(<string>param.get('id'));
      this.root = <string>param.get('root');
      this.backend.get
      // this._email = this.s.allMails.find(x => x.id == emailID);
    })
  }
}
