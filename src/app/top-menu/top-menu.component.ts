import { ConnectorService } from './../services/connector.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faBars, faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendCommunicatorService } from '../services/backend-communicator.service';
import { Email } from '../Classes/Email';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(private s: ConnectorService,private commBack:BackendCommunicatorService) { }
  faBars = faBars;
  faMagnifyingGlass = faMagnifyingGlass;
  faSliders = faSliders;
  hide:boolean = false;
  reactiveForm!:FormGroup;
  SearchedEmails:Email[] = [];
  @ViewChild('searchInput')searchInput!:ElementRef;

  ngOnInit(): void {
   this.reactiveForm = new FormGroup({
    Criteria:new FormControl('all'),
    Folder:new FormControl('All Folders'),
   })
  }

  onSubmit(){
    let Criteria = this.reactiveForm.get('Criteria')?.value;
    let Folder = this.reactiveForm.get('Folder')?.value;
    let searchtext = (<HTMLInputElement>this.searchInput.nativeElement).value;
    this.hide = false;
    
    if(Folder == "All Folders"){
      this.commBack.searchAll(this.s.activeUserID,searchtext,Criteria).subscribe((emails)=>{
        this.SearchedEmails = emails;
        console.log(emails);
      })
    }else{
      this.commBack.searchFile(this.s.activeUserID,searchtext,Folder,Criteria).subscribe((emails)=>{
        this.SearchedEmails = emails;
        console.log(emails);
      })
    }
    
    
  }

  Do() {
    this.s.toggleMenu();
  }

}
