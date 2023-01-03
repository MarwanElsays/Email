package com.example.mailserver.Logic.SendRequestHandler;

public class EmailRequestData {
    private int userId;
    private String receivers;
    private String priority;
    private String title;
    private String body; 
    private String attachments;

    public EmailRequestData(int userId, String receivers, String priority, String title, String body, String attachments){
        this.userId = userId;
        this.receivers = receivers;
        this.priority = priority;
        this.title = title;
        this.body = body;
        this.attachments = attachments;
    }

    public int getUserId(){
        return userId;
    }

    public String getReceivers(){
        return receivers;
    }

    public String getPriority(){
        return priority;
    }

    public String getTitle(){
        return title;
    }

    public String getBody(){
        return body;
    }

    public String getAttachments(){
        return attachments;
    }
}
