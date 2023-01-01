import { EmailData } from './../../Classes/emailData';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Email } from 'src/app/Classes/Email';
import { User } from 'src/app/Classes/user';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';
import { ConnectorService } from 'src/app/services/connector.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit{

  constructor(private s: ConnectorService,private backcomm:BackendCommunicatorService) {}
 
  @ViewChild('checkAllBox') checkAllBox!:ElementRef;
  styleIt:boolean = true;
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  emails:Email[] = [];
  allChecked:boolean = false;
  checkedEmail:Email[] = [];
  
  ngOnInit(): void {

    this.backcomm.getEmailsList(this.s.activeUserID,'inbox',1,1,0).subscribe((emails)=>{
      this.emails = emails;
    });
  }

  private _user: number = this.s.activeUserID;

  get user() {
    return this._user;
  }

  // selectEmail(event:Event,email:Email){
  //   let isChecked = (<HTMLInputElement>event.target).checked;
  //   if(isChecked)this.checkedEmail.push(email);
  //   else{
  //     this.checkedEmail.splice(this.checkedEmail.indexOf(email),1);
  //     console.log(this.checkedEmail);
  //   }
  // }

  // selectAll(){
  //   let isChecked = (<HTMLInputElement>this.checkAllBox.nativeElement).checked
  //   if(isChecked){
  //     this.allChecked = true;
  //     this.checkedEmail = this.user.sent.slice();
  //   }
  //   else{
  //     this.allChecked = false;
  //     this.checkedEmail = [];
  //   }

  // }
}
