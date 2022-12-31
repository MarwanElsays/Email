import { Component, ElementRef, ViewChild } from '@angular/core';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Email } from 'src/app/Classes/EmailData';
import { User } from 'src/app/Classes/user';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  constructor(private s: ConnectorService) {}
  @ViewChild('checkAllBox') checkAllBox!:ElementRef;
  styleIt:boolean = true;
  
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  allChecked:boolean = false;
  checkedEmail:Email[] = [];

  private _user: User = this.s.activeUser;

  get user() {
    return this._user;
  }

  selectEmail(event:Event,email:Email){
    let isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked)this.checkedEmail.push(email);
    else{
      this.checkedEmail.splice(this.checkedEmail.indexOf(email),1);
      console.log(this.checkedEmail);
    }
  }

  selectAll(){
    let isChecked = (<HTMLInputElement>this.checkAllBox.nativeElement).checked
    if(isChecked){
      this.allChecked = true;
      this.checkedEmail = this.user.sent.slice();
    }
    else{
      this.allChecked = false;
      this.checkedEmail = [];
    }

  }
}
