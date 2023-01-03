import { ConnectorService } from '../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/Classes/Email';
import { ActivatedRoute } from '@angular/router';
import { faRotateRight, faArrowLeft, faPaperclip,faFilePdf,faFileWord,faFileExcel,faFileImage,faCode,faC} from '@fortawesome/free-solid-svg-icons';
import { faJava,faJs } from '@fortawesome/free-brands-svg-icons';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';

@Component({
  selector: 'app-sent-emails',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.css']
})
export class ViewMailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private s: ConnectorService, private backend: BackendCommunicatorService) { }

  email: Email | undefined;
  // str:string = '' ;
  attachmentNames: string[] = [];
  
  // icons
  faArrowLeft = faArrowLeft;
  faRotateRight = faRotateRight;
  faPaperclip = faPaperclip;
  java = faJava;
  Pdf = faFilePdf;
  Js = faJs;
  docx = faFileWord;
  Excel = faFileExcel;
  Image = faFileImage;
  Html = faCode;
  c = faC;

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
    this.backend.downloadFile(attachmentName, this.s.activeUserID, this.email!.id).subscribe((s) => {
      let anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(s);
      anchor.download = attachmentName;
      anchor.click();
    })
  }
}


// this.str = s.type;
// console.log(this.str)