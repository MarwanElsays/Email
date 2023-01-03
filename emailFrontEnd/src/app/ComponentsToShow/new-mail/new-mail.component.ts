import { ActivatedRoute, Router } from '@angular/router';
import { ConnectorService } from './../../services/connector.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';
import { lastValueFrom } from 'rxjs';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { EmailData } from 'src/app/Classes/emailData';
import { Email } from 'src/app/Classes/Email';
@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {

  constructor(private s: ConnectorService, private http: HttpClient, private backend: BackendCommunicatorService,private r:Router, private activatedRouter: ActivatedRoute) { }

  @ViewChild('emailbox') emailbox: ElementRef | undefined;
  @ViewChild('subjectbox') subjectbox: ElementRef | undefined;
  @ViewChild('messagebox') messagebox: ElementRef | undefined;
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  @ViewChild('priority') priority: ElementRef | undefined;
  private attachements: FileList | undefined;
  attachmentsNames: string = '';

  receivers: string = '';
  title: string = '';
  body: string = '';
  formData: FormData = new FormData();

  // icons
  faPaperclip = faPaperclip;

  ngOnInit() {
    this.activatedRouter.queryParamMap.subscribe((param) => {
      const id = <string>param.get('id');
      let email!: Email;
      this.s.allMails.forEach((mail) => {
        if (mail.id == id)
          email = mail;
      });
      let receivers: string = '';
      if (email) {
        email.receivers.forEach((receiver) => {
          receivers += email.receivers + ',';
        });
        receivers = receivers.slice(0, -1);
        this.receivers = receivers;
        this.title = email.title;
        this.body = email.body;
        let attachements: string = '';
        email.attachments.forEach((att) => {
          attachements += att + ',';
        });
        attachements = attachements.slice(0, -1);
        this.attachmentsNames = attachements;
      }
    });
  }

  async send() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    const priority = (<HTMLInputElement>this.priority?.nativeElement).value;
    const newMail = new EmailData(this.s.activeUserID, email, priority, subject, message, this.attachmentsNames);
    await lastValueFrom(this.backend.sendEmail(JSON.stringify(newMail)));
    if (this.attachmentsNames != '')
      await lastValueFrom(this.backend.uploadMultipleFiles(this.formData));
    this.r.navigate(['/mail-page',{outlets:{main:['folder', 'sent']}}]);
  }

  async Drafts() {
    const email = (<HTMLInputElement>this.emailbox?.nativeElement).value;
    const subject = (<HTMLInputElement>this.subjectbox?.nativeElement).value;
    const message = (<HTMLInputElement>this.messagebox?.nativeElement).value;
    const priority = (<HTMLInputElement>this.priority?.nativeElement).value;
    const newMail = new EmailData(this.s.activeUserID, email, priority, subject, message, this.attachmentsNames);
    await lastValueFrom(this.backend.moveEmailToDraft(JSON.stringify(newMail)));
    this.r.navigate(['/mail-page',{outlets:{main:['folder', 'draft']}}]);
  }

  addAttachment() {
    const files: FileList = this.fileUpload?.nativeElement.files;
    for (let i = 0; i < files.length; i++) {
      this.attachmentsNames += files[i].name + ',';
    }
    for (let i = 0; i < files.length; i++) {
      this.formData.append('files', files[i]);
    }
  }

  // async openAttachment(attachmentName: string) {
  //   for (let i = 0; i < (<FileList>this.attachements).length; i++) {
  //     if (this.attachements![i]!.name == attachmentName) {
  //       this.backend.downloadFile(this.s.activeUserID, )
  //     }
  //   }
  // }

}


