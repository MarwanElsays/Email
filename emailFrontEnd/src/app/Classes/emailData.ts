export class EmailData {

    userId: number;
    receivers: string;
    priority: string;
    title: string;
    body: string;
    attachments: string;

    constructor(userId: number, receivers: string, priority: string, title: string, body: string, attachments: string) {
        this.userId = userId;
        this.receivers = receivers;
        this.priority = priority;
        this.title = title;
        this.body = body;
        this.attachments = attachments;
    }
}
