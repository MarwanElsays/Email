import { Injectable } from '@angular/core';
import { Email } from '../EmailType/Email';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor() { }
  ID: number = 0;
  hidemenu: boolean = false;
  deletedMails: Email[] = [];
  emails: Email[] = [];
  Draftemails: Email[] = [];
  allMails: Email[] = [];
}


// sendMail = new EventEmitter<Email>();

// emitEmail(email:Email){
//   this.sendMail.emit(email);
// }