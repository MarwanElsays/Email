import { ConnectorService } from './../../services/connector.service';
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Email } from 'src/app/EmailType/Email';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})

export class SentComponent implements OnInit{

  constructor(private s:ConnectorService){}
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  //@ViewChild('emailsDiv')emailsDiv: ElementRef | undefined;
  emails:Email[] = [];

  ngOnInit(): void{
    this.emails = this.s.emails;
  }

  Del(email:Email){
    this.emails.splice(this.emails.indexOf(email),0);
    this.s.emails.splice(this.s.emails.indexOf(email),1);
    this.s.deletedMails.push(email);
  }
}
