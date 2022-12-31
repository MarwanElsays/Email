import { User } from './../../Classes/user';
import { faRotateRight, faTrash, faPenToSquare, faPlus, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})


export class ContactsComponent {
  @ViewChild('firstName') firstName?: ElementRef;
  @ViewChild('lastName') lastName?: ElementRef;
  @ViewChild('emails') emails?: ElementRef;
  private _user: User = this.s.activeUser;
  showEdit: boolean = false;
  faRotateRight = faRotateRight;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faPlus = faPlus;
  faSave = faSave;
  faX = faX;
  
  constructor(private s: ConnectorService) { }

  ngOnInit() {
    this.user.addContacts('maro', this.s.users);
  }

  addContact() {
    const firstName = (<HTMLInputElement>this.firstName?.nativeElement).value;
    const lastName = (<HTMLInputElement>this.lastName?.nativeElement).value;
    const emailString = (<HTMLInputElement>this.emails?.nativeElement).value;
    const emails: string[] = emailString.split('\n');
    console.log(emails);
    // this.user.addContacts();
  }

  toggleShowEdit() {
    this.showEdit = !this.showEdit;
  }

  get user() {
    return this._user;
  }
}
