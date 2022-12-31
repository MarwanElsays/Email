import { User } from "./user";

export class Email {
    private _to: string[];
    private _from: User;
    private _subject: string;
    private _message: string;
    private _Attachments: string[];
    private _priority: string;
    private _id!: string;

    constructor(to: string[], from: User, subject: string, message: string, Attachments: string[], priority: string) {
        this._to = to;
        this._from = from;
        this._subject = subject;
        this._message = message;
        this._Attachments = Attachments;
        this._priority = priority;
    }

    get from() {
        return this._from.email;
    }

    get fromEmail() {
        return this._from.id;
    }

    get id() {
        return this._id;
    }

    get to() {
        return this._to;
    }

    get subject() {
        return this._subject;
    }

    get message() {
        return this._message;
    }

    get Attachments() {
        return this._Attachments;
    }

    get priority() {
        return this._priority;
    }

}