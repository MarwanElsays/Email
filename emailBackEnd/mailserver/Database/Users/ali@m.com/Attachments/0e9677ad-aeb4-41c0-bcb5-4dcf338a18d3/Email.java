package com.example.mailserver.Logic;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.UUID;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

//change
public class Email{
    private String sender;
    private Queue<String> receivers;
    private String priority;
    private String title;
    private String body;
    private String id;
    private String time;
    private Queue<String> attachments;

    public Email(String id, String sender, Queue<String> receivers, String title, String body, String time, Queue<String> attachments, String priority){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        this.id = id;
        this.sender = sender;
        this.receivers = receivers;
        this.title = title;
        this.body = body;
        this.time = time;
        this.attachments = attachments;
        this.priority = priority;

        if(id == null) this.id = UUID.randomUUID().toString();
        if(time == null) this.time = String.valueOf(dtf.format(now));
    }

    public String getSender() {
        return sender;
    }

    public Queue<String> getReceivers() {
        return receivers;
    }

    public Queue<String> cloneReceivers() {
        Queue<String> newQueue = new LinkedList<>();
        for (String receiver : receivers) {
            newQueue.add(receiver);
        }
        return newQueue;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getId() {
        return id;
    }

    public String getTime() {
        return time;
    }

    public Queue<String> getAttachments() {
        return attachments;
    }

    public String getPriority(){
        return priority;
    }
}