import { ConnectorService } from './../../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/EmailType/Email';
import { ActivatedRoute } from '@angular/router';
import { faRotateRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sent-emails',
  templateUrl: './sent-emails.component.html',
  styleUrls: ['./sent-emails.component.css']
})
export class SentEmailsComponent implements OnInit{

  constructor(private activeRoute:ActivatedRoute,private s:ConnectorService){ }

  faRotateRight = faRotateRight;
  faArrowLeft = faArrowLeft;
  email:Email | undefined;
  emailID:number = 0;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) =>{
      this.emailID = parseInt(<string>param.get('id'));
      this.email = this.s.allMails.find(x => x.id == this.emailID);
    })
  }

}
