import { ConnectorService } from './../../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Email } from 'src/app/EmailType/Email';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor(private s:ConnectorService){}
  faRotateRight = faRotateRight;
  deletedemails:Email[] = [];

  ngOnInit(): void{
    this.deletedemails = this.s.deletedMails;
  }
  
}
