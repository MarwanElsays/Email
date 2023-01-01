import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Email } from '../Classes/Email';
import { BackendCommunicatorService } from '../services/backend-communicator.service';
import { ConnectorService } from '../services/connector.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  name!: string;
  emails!: Email[];
  checkedEmail:Email[] = [];
  @ViewChild('checkAllBox') checkAllBox!: ElementRef;

  styleIt:boolean = true;
  faRotateRight = faRotateRight;
  faTrash = faTrash;
  
  constructor(private s: ConnectorService, private backend: BackendCommunicatorService) {}

  ngOnInit(): void {
    this.name = 'inbox';
    this.backend.getEmailsList(this.s.activeUserID, this.name, 1, 1, 0).subscribe((emails) => {
      this.emails = emails;
    });
  }

  // selectAll(){
  //   let isChecked = (<HTMLInputElement>this.checkAllBox.nativeElement).checked;
  //   if(isChecked){
  //     // this.allChecked = true;
  //     this.checkedEmail = this.user.sent.slice();
  //   }
  //   else{
  //     this.allChecked = false;
  //     this.checkedEmail = [];
  //   }
  // }
}
