import { emailData } from './emailData';
import { Email } from "./Email";

export class Adapter {

    public static adapt(email: Email){
       let data!: emailData;

        data.userId = email.from;
        data.body = email.message;
        data.title = email.subject;
        data.attachments = email.Attachments;
        data.priority = email.priority;
        data.receivers = email.to;

        return data;
    }
}