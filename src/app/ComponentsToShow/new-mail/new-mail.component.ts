import { ConnectorService } from './../../services/connector.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Email } from 'src/app/Classes/Email';
import { Gender, User } from 'src/app/Classes/user';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent {

  constructor(private s: ConnectorService, private http: HttpClient) { }

  @ViewChild('emailbox') emailbox: ElementRef | undefined;
  @ViewChild('subjectbox') subjectbox: ElementRef | undefined;
  @ViewChild('messagebox') messagebox: ElementRef | undefined;
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  private attachements: FileList | undefined;

  send() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    let to = new User("", "", new Date(""), Gender.male, "", "");
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
    console.log(this.attachements);
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

  addAttachment() {
    const files: FileList = this.fileUpload?.nativeElement.files;
    this.attachements = files;
    console.log(files[0]);

    let formData = new FormData();
    formData.append('file', files[0]);
    this.http.post('http://localhost:8085/file', formData).subscribe();
  }

}
