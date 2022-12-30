import { Contact } from "./contact";
import { Email } from "./Email";

export enum Gender {
    male,
    female
}

export class User {
    
    private _firstName: string;
    private _lastName: string;
    private _birthDate: Date;
    private _gender: Gender;
    private _email: string;
    private _password: string;
    private _inbox: Email[] = [];
    private _sent: Email[] = [];
    private _trash: Email[] = [];
    private _draft: Email[] = [];
    private _contacts: Contact[] = [];

    constructor(firstName: string, lastName: string, birthDate: Date, gender: Gender ,email: string, password: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthDate = birthDate;
        this._gender = gender;
        this._email = email;
        this._password = password;
    }

    addContacts(name:string,users:User[]){
        this._contacts.push(new Contact(name,users));
    }

    addToSent(mail: Email) {
        this.sent.push(mail);
    }

    addToInbox(mail: Email) {
        this.inbox.push(mail);
    }

    delete(email: Email, root: string) {
        if (root != 'trash')
            this.trash.push(email);
        switch (root) {
            case 'inbox': this.inbox.splice(this.inbox.indexOf(email), 1); break;
            case 'sent':  this.sent.splice(this.sent.indexOf(email), 1);   break;
            case 'draft': this.draft.splice(this.draft.indexOf(email), 1); break;
            case 'trash': this.trash.splice(this.trash.indexOf(email), 1); break;
        }
    }

    get trash() {
        return this._trash;
    }

    get inbox() {
        return this._inbox;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get draft() {
        return this._draft;
    }

    get sent() {
        return this._sent;
    }

    get contacts() {
        return this._contacts;
    }
}
