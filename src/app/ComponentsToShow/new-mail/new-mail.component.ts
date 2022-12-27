import { ConnectorService } from './../../services/connector.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Email } from 'src/app/EmailType/Email';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent {

  constructor(private s:ConnectorService){}

  @ViewChild('emailbox') emailbox:ElementRef | undefined;
  @ViewChild('subjectbox') subjectbox:ElementRef | undefined;
  @ViewChild('messagebox') messagebox:ElementRef | undefined;
  
  send(){
    let email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    let subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    let message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    let e = new Email(email,subject,message,[],new Date(),this.s.ID);
    this.s.ID++;
    this.s.emails.push(e);
    this.s.allMails.push(e);
  }

  Drafts(){
    let email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    let subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    let message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    let e = new Email(email,subject,message,[],new Date(),this.s.ID);
    this.s.ID++;
    this.s.Draftemails.push(e);
    this.s.allMails.push(e);
  }
  
}
