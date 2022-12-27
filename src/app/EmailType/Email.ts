export class Email{
    id:number;
    to: string;
    subject:string;
    message:string;
    Attachments:any[];
    date:Date;

    constructor(to: string,subject: string,message: string,Attachments:any[],date:Date,id:number){
        this.to = to;
        this.subject = subject;
        this.message = message;
        this.Attachments = Attachments;
        this.date = date
        this.id = id;
    }
}