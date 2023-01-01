import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  checkedEmail:Email[] = [];
  allChecked: boolean = false;
  @ViewChild('checkAllBox') checkAllBox!: ElementRef;

  styleIt: boolean = true;
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  
  constructor(private s: ConnectorService, private backend: BackendCommunicatorService) {}

  ngOnInit(): void {
    this.s.changeFolderName.subscribe((name) => {
      this.backend.getEmailsList(this.s.activeUserID, name, 1, 1, 0).subscribe((emails) => {
        console.log(this.folder.name);
        this.folder.name = name;
        this.folder.emails = emails;
      });
    });
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
}
