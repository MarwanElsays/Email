import { Folder } from "../folder/folder.component";
import { BackendCommunicatorService } from "../services/backend-communicator.service";
import { Contact } from "./contact";
import { Email } from "./Email";

export class User {

    private _id: number;
    private _email: string;
    private _password: string;
    private _folders!: Folder[];
    private _inbox: Email[] = [];
    private _sent: Email[] = [];
    private _trash: Email[] = [];
    private _draft: Email[] = [];
    private _contacts: Contact[] = [];

    constructor(email: string, password: string, id: number, private backend: BackendCommunicatorService) {
        this._email = email;
        this._password = password;
        this._id = id;
    }

    addContacts(firstName: string, lastName: string, users: User[]) {
        this._contacts.push(new Contact(firstName, lastName, users));
    }

    addToSent(mail: Email) {
        this.sent.push(mail);
    }

    addToInbox(mail: Email) {
        this.inbox.push(mail);
    }

    deleteEmail(email: Email, root: string) {
        this.backend.deleteEmail(this.id, email.id, root);
    }

    deleteContact(contact: Contact) {
        this.contacts.splice(this.contacts.indexOf(contact), 1);
    }
    
    deleteMultipleEmails(email: Email[], root: string) {
        let emailIDs: string = '';
        email.forEach((email) => {
            emailIDs += email.id;
        })
        emailIDs = emailIDs.slice(0, emailIDs.length - 2);
        this.backend.deleteMultipleEmails(this.id, emailIDs, root);
    }

    addCustomFolder(folderName: string) {
        this.backend.createNewCustomFolder(this.id, folderName);
    }

    renameCustomFolder(oldName: string, newName: string) {
        this.backend.renameCustomFolder(this.id, oldName, newName);
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

    get id() {
        return this._id;
    }
}
