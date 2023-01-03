import { ConnectorService } from '../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/Classes/Email';
import { ActivatedRoute } from '@angular/router';
import { faRotateRight, faArrowLeft, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';

@Component({
  selector: 'app-sent-emails',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.css']
})
export class ViewMailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private s: ConnectorService, private backend: BackendCommunicatorService) { }

  email!: Email;
  attachmentNames: string[] = [];
  
  // icons
  faArrowLeft = faArrowLeft;
  faRotateRight = faRotateRight;
  faPaperclip = faPaperclip;

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((param) => {
      const emailID = <string>param.get('id');
      this.s.allMails.forEach((email) => {
        if (email.id == emailID) {
          this.email = email;
        }
      });
    });
  }
  
  openAttachment(attachmentName: string) {
    this.backend.downloadFile(attachmentName, this.s.activeUserID, this.email.id).subscribe((s) => {
      
    })
  }
}
