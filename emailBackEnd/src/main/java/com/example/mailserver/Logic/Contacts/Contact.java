package com.example.mailserver.Logic.Contacts;

public class Contact {
    private String contactName;
    private String[] emailAddresses;

    public Contact(String contactName, String[] emailAddresses){
        this.contactName = contactName;
        this.emailAddresses = emailAddresses;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String[] getEmailAddresses() {
        return emailAddresses;
    }

    public void setEmailAddresses(String[] emailAddresses) {
        this.emailAddresses = emailAddresses;
    }

}
