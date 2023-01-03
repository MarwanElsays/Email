import { faRotateRight, faTrash, faPenToSquare, faPlus, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';
import { lastValueFrom } from 'rxjs';
import { BackendCommunicatorService } from 'src/app/services/backend-communicator.service';

export class Contact {
  contactName: string = '';
  emailAddresses: string[] = [];
}


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})


export class ContactsComponent implements OnInit {
  @ViewChild('name') name?: ElementRef;
  @ViewChild('emails') emails?: ElementRef;
  contacts: Contact[] = [];
  showEdit: boolean = false;
  oldName: string = '';
  oldEmails: string = '';
  
  
  // icons
  faRotateRight = faRotateRight;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faPlus = faPlus;
  faSave = faSave;
  faX = faX;
  
  constructor(private s: ConnectorService, private backend: BackendCommunicatorService) { }
  async ngOnInit() {
    this.contacts = await lastValueFrom(this.backend.getAllContacts(this.s.activeUserID));
  }

  
  initEdit(contact: Contact) {
    this.showEdit = true;
    (<HTMLInputElement>this.name?.nativeElement).value = contact.contactName;
    let emails: string = '';
    contact.emailAddresses.forEach((email) => {
      emails += email + ',';
    });
    emails = emails.slice(0, -1);
    (<HTMLInputElement>this.emails?.nativeElement).value = emails;
    this.oldName = contact.contactName;
    this.oldEmails = emails;
  }

  async addContact() {
    const name = (<HTMLInputElement>this.name?.nativeElement).value;
    const emails = (<HTMLInputElement>this.emails?.nativeElement).value;
    console.log(this.oldEmails, this.oldName);
    if (this.oldName == '' && this.oldEmails == '')
      this.contacts = await lastValueFrom(this.backend.addNewContact(this.s.activeUserID, name, emails));
    else {
      if (this.oldName != name) {
        this.contacts = await lastValueFrom(this.backend.editContactName(this.s.activeUserID, this.oldName, name));
      }
      if (this.oldEmails != emails) {
        this.contacts = await lastValueFrom(this.backend.editContactEmails(this.s.activeUserID, this.oldEmails, emails));
      }
    }
    this.endEdit();
    console.log(this.contacts);
  }

  async deleteContact(contact: Contact) {
    console.log(this.contacts);
    this.contacts = await lastValueFrom(this.backend.deleteContact(this.s.activeUserID, contact.contactName));
    console.log(this.contacts);
    this.endEdit();
  }
  
  endEdit() {
    this.showEdit = false;
    this.oldEmails = '';
    this.oldName = '';
  }

  emptyContact() {
    return new Contact();
  }
}
