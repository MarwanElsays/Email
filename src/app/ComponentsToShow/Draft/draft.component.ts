import { ConnectorService } from './../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Email } from 'src/app/EmailType/Email';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  constructor(private s:ConnectorService){}
  faRotateRight = faRotateRight;
  draftEmails:Email[] = [];

  ngOnInit(): void{
    this.draftEmails = this.s.Draftemails;
  }

}
