import { ConnectorService } from './../../services/connector.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';
import { EmailData } from 'src/app/Classes/EmailData';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent {

  constructor(private s: ConnectorService, private http: HttpClient, private backend: BackendCommunicatorService) { }

  @ViewChild('emailbox') emailbox: ElementRef | undefined;
  @ViewChild('subjectbox') subjectbox: ElementRef | undefined;
  @ViewChild('messagebox') messagebox: ElementRef | undefined;
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  private attachements: FileList | undefined;

  send() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    const newMail = new EmailData(this.s.activeUserID, email, 'high', subject, message, '');
    this.backend.sendEmail(JSON.stringify(newMail));
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
