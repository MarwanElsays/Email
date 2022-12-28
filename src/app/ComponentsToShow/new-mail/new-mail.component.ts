import { ConnectorService } from './../../services/connector.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Email } from 'src/app/Classes/Email';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent {

  constructor(private s: ConnectorService) { }

  @ViewChild('emailbox') emailbox: ElementRef | undefined;
  @ViewChild('subjectbox') subjectbox: ElementRef | undefined;
  @ViewChild('messagebox') messagebox: ElementRef | undefined;

  send() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    let to = new User("", "");
    this.s.users.forEach(user => {
      if (user.email == email)
        to = user;
    });
    const e = new Email(to, this.s.activeUser, subject, message, [], new Date(), this.s.ID, 1);
    this.s.incrementID();
    this.s.activeUser.addToSent(e);
    to.addToInbox(e);
    console.log(this.s.users);
    this.s.allMails.push(e);
  }

  Drafts() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    // let e = new Email(email, subject, message, [], new Date(), this.s.ID, 1);
    // this.s.ID++;
    // this.s.Draftemails.push(e);
    // this.s.allMails.push(e);
  }

}
