export class Email {
    
    private _sender: string;
    private _receivers: string[];
    private _priority: string;
    private _title: string;
    private _body: string;
    private _id: string;
    private _time: string;
    private _attachments: string[];

    constructor(sender: string, receivers: string[], priority: string, title: string, body: string, id: string, time: string, attachments: string[]) {
        this._sender = sender;
        this._receivers = receivers;
        this._priority = priority;
        this._title = title;
        this._body = body;
        this._id = id;
        this._time = time;
        this._attachments = attachments;
    }

    get id() {
        return this._id;
    }
}