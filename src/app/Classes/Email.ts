import { User } from "./user";

export class Email {
    private _to: string[];
    private _from: string;
    private _subject: string;
    private _message: string;
    private _Attachments: string[];
    private _date: Date;
    private _priority: string;

    constructor(to: User[], from: User, subject: string, message: string, Attachments: string[], date: Date, id: string, priority: string) {
        this._to = to;
        this._from = from;
        this._subject = subject;
        this._message = message;
        this._Attachments = Attachments;
        this._date = date
        this._priority = priority;
    }

    get from() {
        return this._from.email;
    }

    get to() {
        return this._to.email;
    }

    get subject() {
        return this._subject;
    }

    get message() {
        return this._message;
    }

    get date() {
        return this._date;
    }

    get Attachments() {
        return this._Attachments;
    }

    get priority() {
        return this._priority;
    }

}