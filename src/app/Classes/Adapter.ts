import { emailData } from './emailData';
import { Email } from "./Email";

export class Adapter{

    Adapt(email:Email){
       let a!:emailData;

        a.userId = email.from;
        a.body = email.message;
        a.title = email.subject;
        a.attachments = email.Attachments;
        a.priority = email.priority;
        a.receivers = email.to;       

    }
}