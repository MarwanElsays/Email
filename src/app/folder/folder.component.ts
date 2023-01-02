import { FormGroup, FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faRotateRight, faTrash,faSort,faFilter} from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Email } from '../Classes/Email';
import { BackendCommunicatorService } from '../services/backend-communicator.service';
import { ConnectorService } from '../services/connector.service';
import { ActivatedRoute, Router } from '@angular/router';

export class Folder {
  name!: string;
  emails: Email[] = [];
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  folder: Folder = new Folder();
  folders: string[] = [];
  checkedEmail:Email[] = [];
  allChecked: boolean = false;
  @ViewChild('checkAllBox') checkAllBox!: ElementRef;
  sortGroup!:FormGroup;
  filterGroup!:FormGroup;
  styleIt: boolean = true;
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  faSort = faSort;
  showsort = true;    /* to show the sort div*/
  showfilter = true;  /* to show the filter div*/
  faFilter = faFilter;
  
  constructor(public s: ConnectorService, private backend: BackendCommunicatorService, private r: Router, private activeRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.sortGroup = new FormGroup({
      sortType: new FormControl('priority'),
      sortIdentifier: new FormControl('Ascending'),
    });
    this.filterGroup = new FormGroup({
      filterType: new FormControl('priority'),
      priorityIdentifier: new FormControl('low'),
      attachIdentifier: new FormControl('no attachment'),
    });
    this.activeRoute.paramMap.subscribe(async (param) => {
      const name = param.get('root');
      this.folder.name = <string>name;
      this.folder.emails = await lastValueFrom(this.backend.getEmailsList(this.s.activeUserID, <string>name, 1, 1, 0));
    });
  }

  async moveEmail(email: Email, event: Event) {
    const dstFolder = (<HTMLInputElement>event.target).value;
    console.log(this.folder.name);
    await lastValueFrom(this.backend.MoveEmail(this.s.activeUserID, email.id, this.folder.name, dstFolder));
    this.folder.emails = await lastValueFrom (this.backend.getEmailsList(this.s.activeUserID, this.folder.name, 1, 1, 0));
  }

  async moveMultiple(event: Event) {
    const dstFolder = (<HTMLInputElement>event.target).value;
    let emailsString: string = ''
    this.checkedEmail.forEach((email) => {
      emailsString += email.id + ",";
    });
    emailsString = emailsString.slice(0, -1);
    this.checkedEmail = [];
    await lastValueFrom(this.backend.MoveMultipleEmails(this.s.activeUserID, emailsString, this.folder.name, dstFolder));
    this.folder.emails = await lastValueFrom (this.backend.getEmailsList(this.s.activeUserID, this.folder.name, 1, 1, 0));
  }

  selectEmail(email: Email, event: Event) {
    let isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked)
      this.checkedEmail.push(email);
    else{
      this.checkedEmail.splice(this.checkedEmail.indexOf(email),1);
    }
    console.log(this.checkedEmail);
  }

  selectAll() {
    let isChecked = (<HTMLInputElement>this.checkAllBox.nativeElement).checked;
    if(isChecked){
      this.allChecked = true;
      this.checkedEmail = this.folder.emails.slice();
    }
    else {
      this.allChecked = false;
      this.checkedEmail = [];
    }
  }

  async onSort(){
    this.showsort = false;
    let sortType;
    let sortIdentifier;

    if(this.sortGroup.get('sortType')?.value == "priority")sortType = 0;
    else sortType = 1;

    if(this.sortGroup.get('sortIdentifier')?.value == "Ascending")sortIdentifier = 0;
    else sortIdentifier = 1;
     
    this.folder.emails = await lastValueFrom(this.backend.sort(this.s.activeUserID,this.folder.name,sortType,sortIdentifier));

    console.log("hi",this.folder.emails );
  }

  async deleteEmail(emailId:string, event: Event){
    if(this.folder.name != 'trash')
      await lastValueFrom(this.backend.deleteEmail(this.s.activeUserID,emailId,this.folder.name));
    else
      await lastValueFrom(this.backend.deleteEmailForever(this.s.activeUserID,emailId));

    this.folder.emails = await lastValueFrom (this.backend.getEmailsList(this.s.activeUserID, this.folder.name, 1, 1, 0));
  }

  async deleteAll(){
    let emailIds ='';
    this.checkedEmail.forEach(e =>{
      emailIds += e.id + ',';
    });
    emailIds = emailIds.slice(0, -1);
    this.checkedEmail = [];
    await lastValueFrom(this.backend.deleteMultipleEmails(this.s.activeUserID,emailIds,this.folder.name));
    this.folder.emails = await lastValueFrom (this.backend.getEmailsList(this.s.activeUserID, this.folder.name, 1, 1, 0));
  }

  viewMail(email: Email) {
    this.r.navigate(['/mail-page',{outlets:{main:['sentemails', email.id]}}]);
  }

  async onFilter(){
    this.showfilter = false;
    let required;
    let Criteria = this.filterGroup.get('filterType')?.value;
    if(Criteria == "priority")required = this.filterGroup.get('priorityIdentifier')?.value;
    else required = this.filterGroup.get('attachIdentifier')?.value;

    this.folder.emails = await lastValueFrom(this.backend.filter(this.s.activeUserID,required,this.folder.name,Criteria));
  }
}
