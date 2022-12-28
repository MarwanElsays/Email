import { User } from "./user";

export class Email {
    private _id: number;
    private _to: User;
    private _from: User;
    private _subject: string;
    private _message: string;
    private _Attachments: File[];
    private _date: Date;
    private _priority: number;

    constructor(to: User, from: User, subject: string, message: string, Attachments: File[], date: Date, id: number, priority: number) {
        this._to = to;
        this._from = from;
        this._subject = subject;
        this._message = message;
        this._Attachments = Attachments;
        this._date = date
        this._id = id;
        this._priority = priority;
    }

    get from() {
        return this._from.email;
    }

    get id() {
        return this._id;
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
}