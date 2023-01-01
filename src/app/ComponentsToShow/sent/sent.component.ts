import { ConnectorService } from './../../services/connector.service';
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})

export class SentComponent {

  constructor(private s: ConnectorService) { }
  @ViewChild('checkAllBox') checkAllBox!:ElementRef;
  
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  allChecked:boolean = false;
  // checkedEmail:Email[] = [];

  // private _user: number = this.s.activeUserID;

  // get user() {
  //   return this._user;
  // }

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
