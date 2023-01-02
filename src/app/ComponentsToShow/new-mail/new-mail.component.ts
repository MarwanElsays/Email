import { Router } from '@angular/router';
import { ConnectorService } from './../../services/connector.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';
import { EmailData } from 'src/app/Classes/emailData';
import { lastValueFrom } from 'rxjs';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent {

  constructor(private s: ConnectorService, private http: HttpClient, private backend: BackendCommunicatorService,private r:Router) { }

  @ViewChild('emailbox') emailbox: ElementRef | undefined;
  @ViewChild('subjectbox') subjectbox: ElementRef | undefined;
  @ViewChild('messagebox') messagebox: ElementRef | undefined;
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  @ViewChild('priority') priority: ElementRef | undefined;
  private attachements: FileList | undefined;
  attachmentsNames: string[] = [];

  // icons
  faPaperclip = faPaperclip;

  async send() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    const priority = (<HTMLInputElement>this.priority?.nativeElement).value;
    const newMail = new EmailData(this.s.activeUserID, email, priority, subject, message, '');
    await lastValueFrom(this.backend.sendEmail(JSON.stringify(newMail)));
    this.r.navigate(['/mail-page',{outlets:{main:['folder', 'sent']}}]);
  }

  async Drafts() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    const priority = (<HTMLInputElement>this.priority?.nativeElement).value;
    const newMail = new EmailData(this.s.activeUserID, email, priority, subject, message, '');

  }

  addAttachment() {
    const files: FileList = this.fileUpload?.nativeElement.files;

    for (let i = 0; i < files.length; i++) {
      this.attachmentsNames.push(files[0].name);
    }
    let formData = new FormData();
    formData.append(files[0].name, files[0]);
    this.http.post('http://localhost:8085/file', formData).subscribe();
  }

  // async openAttachment(attachmentName: string) {
  //   for (let i = 0; i < (<FileList>this.attachements).length; i++) {
  //     if (this.attachements![i]!.name == attachmentName) {
  //       this.backend.downloadFile(this.s.activeUserID, )
  //     }
  //   }
  // }

}


