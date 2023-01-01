import { User } from './../../Classes/user';
import { faRotateRight, faTrash, faPenToSquare, faPlus, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';
import { Email } from 'src/app/Classes/Email';
import { first } from 'rxjs';
import { Contact } from 'src/app/Classes/contact';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})


export class ContactsComponent {
  @ViewChild('firstName') firstName?: ElementRef;
  @ViewChild('lastName') lastName?: ElementRef;
  @ViewChild('emails') emails?: ElementRef;
  private _user: number = this.s.activeUserID;
  showEdit: boolean = false;
  faRotateRight = faRotateRight;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faPlus = faPlus;
  faSave = faSave;
  faX = faX;
  
  constructor(private s: ConnectorService) { }

  // addContact() {
  //   const firstName = (<HTMLInputElement>this.firstName?.nativeElement).value;
  //   const lastName = (<HTMLInputElement>this.lastName?.nativeElement).value;
  //   const emailString = (<HTMLInputElement>this.emails?.nativeElement).value;
  //   const emails: string[] = emailString.split('\n');
  //   let contactEmails: User[] = [];
  //   let found: boolean = false;
  //   this.s.users.forEach((user) => {
  //     emails.forEach((email) => {
  //       if (email == user.email) {
  //         contactEmails.push(user);
  //         found = true;
  //       }
  //     })
  //   });
  //   if (found)
  //     this.user.addContacts(firstName, lastName, contactEmails);
  //   console.log(this.user.contacts);
  // }

  // initEdit(contact: Contact) {
  //   this.showEdit = true;
  //   (<HTMLInputElement>this.firstName?.nativeElement).value = contact.firstName;
  //   (<HTMLInputElement>this.lastName?.nativeElement).value = contact.lastName;
  //   let emails: string = '';
  //   contact.accounts.forEach((user) => {
  //     emails += user.email + '\n';
  //   });
  //   (<HTMLInputElement>this.emails?.nativeElement).value = emails;
  //   // this.user.deleteContact(contact);
  // }

  // resetNewContactsDiv() {
  //   this.showEdit = false;
  //   (<HTMLInputElement>this.firstName?.nativeElement).value = '';
  //   (<HTMLInputElement>this.lastName?.nativeElement).value = '';
  //   (<HTMLInputElement>this.emails?.nativeElement).value = '';
  // }

  get user() {
    return this._user;
  }
}
