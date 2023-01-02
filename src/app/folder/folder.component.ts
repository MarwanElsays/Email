import { FormGroup, FormControl } from '@angular/forms';
import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faRotateRight, faTrash,faSort,faFilter} from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Email } from '../Classes/Email';
import { BackendCommunicatorService } from '../services/backend-communicator.service';
import { ConnectorService } from '../services/connector.service';

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
  styleIt: boolean = true;
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  faSort = faSort;
  showsort = false;
  faFilter = faFilter;
  
  constructor(public s: ConnectorService, private backend: BackendCommunicatorService) {}

  ngOnInit() {
  this.sortGroup = new FormGroup({
      sortType: new FormControl('priority'),
      sortIdentifier: new FormControl('Ascending'),
    })
    this.folders = this.s.folders;
    this.s.changeFolderName.subscribe((name) => {
      this.backend.getEmailsList(this.s.activeUserID, name, 1, 1, 0).subscribe((emails) => {
        this.folder.name = name;
        this.folder.emails = emails;
      });
    });
  }

  async moveEmail(email: Email, event: Event) {
    let dstFolder = (<HTMLInputElement>event.target).value;
    console.log(this.folder.name);
    await lastValueFrom(this.backend.MoveEmail(this.s.activeUserID, email.id, this.folder.name, dstFolder));
  }

  async moveMultiple(event: Event) {
    let dstFolder = (<HTMLInputElement>event.target).value;
    let emailsString: string = ''
    this.checkedEmail.forEach((email) => {
      emailsString += email.id + ",";
    })
    emailsString.slice(0, -1);
    await lastValueFrom(this.backend.MoveMultipleEmails(this.s.activeUserID, emailsString, this.s.folderName, dstFolder));
  }

  selectEmail(event: Event, email: Email) {
    let isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked)
      this.checkedEmail.push(email);
    else{
      this.checkedEmail.splice(this.checkedEmail.indexOf(email),1);
    }
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

  async deleteEmail(emailId:string){
    if(this.folder.name != 'trash')
      await lastValueFrom(this.backend.deleteEmail(this.s.activeUserID,emailId,this.folder.name));
    else
      await lastValueFrom(this.backend.deleteEmailForever(this.s.activeUserID,emailId));

    this.folder.emails = await lastValueFrom (this.backend.getEmailsList(this.s.activeUserID, this.folder.name, 1, 1, 0));
  }

  async deleteAll(){
    let emailIds ='';
    this.checkedEmail.forEach(e =>{
      emailIds+=e.id+',';
    })

    await lastValueFrom(this.backend.deleteMultipleEmails(this.s.activeUserID,emailIds,this.folder.name));
    this.folder.emails = await lastValueFrom (this.backend.getEmailsList(this.s.activeUserID, this.folder.name, 1, 1, 0));
  }
}
