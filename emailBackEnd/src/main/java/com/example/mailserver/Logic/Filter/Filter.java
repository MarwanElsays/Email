package com.example.mailserver.Logic.Filter;

import com.example.mailserver.Logic.Email;
import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.Folders.*;

public class Filter implements Criteria {

    private FoldersMap foldersMap;

    private JsonEmailConverter jsonEmailConverter = JsonEmailConverter.getInstance();

    public Filter(FoldersMap foldersMap){
        this.foldersMap = foldersMap;
    }

    public String filterFile(String required, String fileName, String criteria){
        Email[] allEmails =  foldersMap.getFolder(fileName).getAllEmailsArray();
        if(allEmails.length == 0) return "[]";
        String requiredEmails = meetCriteria(required, allEmails, criteria);
        if(requiredEmails.equals("]")) return "[]";
        return requiredEmails;
    }

    @Override
    public String meetCriteria(String required, Email[] emails, String criteria) {
        required = required.toLowerCase();
        String priority = null;
        String[] attachments = null;
        String requiredEmails = "[";
        for(Email email : emails){
            if(criteria.equalsIgnoreCase("attachment") || criteria.equalsIgnoreCase("no attachment")) attachments = email.getAttachments().toArray(new String[email.getAttachments().size()]);
            if(criteria.equalsIgnoreCase("priority")) priority = email.getPriority();

            if((criteria.equalsIgnoreCase("priority")) && priority.toLowerCase().contains(required)){
                requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";
                continue;
            }
            
            if(criteria.equalsIgnoreCase("attachment")){
                if(attachments.length !=0){
                    if(attachments.length == 1 && attachments[0].equals("")) continue;
                    requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";
                    continue;
                }
            }
            if(criteria.equalsIgnoreCase("no attachment")){
                if(attachments.length == 0){
                requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";
                }
                continue;
            }
        }
        requiredEmails = requiredEmails.substring(0, requiredEmails.length()-1) + "]";
        return requiredEmails;
    }
    
}