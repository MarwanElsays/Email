package com.example.mailserver.Logic.Filter;

import java.util.ArrayList;

import com.example.mailserver.Logic.Email;
import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.Folders.*;
import com.example.mailserver.Logic.operationsHandlers.FolderHandler;


public class Search implements Criteria{

    private FoldersMap foldersMap;
    private FolderHandler folderHandler;
    private JsonEmailConverter jsonEmailConverter = JsonEmailConverter.getInstance();

    public Search(FoldersMap foldersMap, FolderHandler folderHandler){
        this.foldersMap = foldersMap;
        this.folderHandler = folderHandler;
    }
    

    public String searchFile(String sentence, String fileName, String criteria){
        String[] searchArray = sentence.split(" ");
        Email[] allEmails = foldersMap.getFolder(fileName).getAllEmailsArray();
        // //
        // System.out.println(allEmails.length);
        // //
        if(allEmails.length == 0) return "[]";
        
        String requiredEmails = "[";

        for(String word : searchArray) requiredEmails += meetCriteria(word, allEmails, criteria);

        requiredEmails = requiredEmails.substring(0, requiredEmails.length()-1) + "]";
        if(requiredEmails.equals("]")) return "[]";
        return requiredEmails;
    }

    public String searchAllFiles(String sentence, String criteria){
        String requiredEmails = "[";
        String resultingEmails = "";
        ArrayList<String> files = new ArrayList<String>();
        String[] customFiles = folderHandler.getExistingCustomFolderNames();

        files.add("inbox");
        files.add("sent");
        files.add("draft");
        files.add("trash");

        for(String word : customFiles) files.add(word);


        for(String file : files){
            resultingEmails = searchFile(sentence, file, criteria);
            if(resultingEmails.equals("[]") || resultingEmails.equals("")) continue;
            resultingEmails = resultingEmails.substring(1, resultingEmails.length()-1);
            requiredEmails += resultingEmails + ",";
        }
        requiredEmails = requiredEmails.substring(0, requiredEmails.length()-1) + "]";
        return requiredEmails;
    }

    @Override
    public String meetCriteria(String required, Email[] emails, String criteria) {
        required = required.toLowerCase();
        String requiredEmails = "";
        String emailTitle = "";
        String emailBody = "";
        String emailSender = "";
        String[] emailReceivers = null;
        String[] emailAttachments = null;
        for(Email email : emails){

            if(criteria.equalsIgnoreCase("all") || criteria.equalsIgnoreCase("body")) emailBody = email.getBody().toLowerCase();
            if(criteria.equalsIgnoreCase("all") || criteria.equalsIgnoreCase("subject")) emailTitle = email.getTitle().toLowerCase();
            if(criteria.equalsIgnoreCase("all") || criteria.equalsIgnoreCase("sender")) emailSender = email.getSender().toLowerCase();
            if(criteria.equalsIgnoreCase("all") || criteria.equalsIgnoreCase("receiver")) emailReceivers = email.getReceivers().toArray(new String[email.getReceivers().size()]);
            if(criteria.equalsIgnoreCase("all") || criteria.equalsIgnoreCase("attachment")) emailAttachments = email.getAttachments().toArray(new String[email.getAttachments().size()]);
            
            if((criteria.equalsIgnoreCase("subject") || criteria.equalsIgnoreCase("all")) && emailTitle.contains(required)){
                requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";
                continue;
            }
            if((criteria.equalsIgnoreCase("body") || criteria.equalsIgnoreCase("all")) && emailBody.contains(required)){
                requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";

                continue;
            }
            if((criteria.equalsIgnoreCase("sender") || criteria.equalsIgnoreCase("all")) && emailSender.contains(required)){
                requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";

                continue;
            }
            if(criteria.equalsIgnoreCase("receiver") || criteria.equalsIgnoreCase("all")){
                for(String receiver : emailReceivers){
                    if(receiver.toLowerCase().contains(required.toLowerCase())){
                        requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";
                        continue;
                    }
                }
            }
            if(criteria.equalsIgnoreCase("attachment") || criteria.equalsIgnoreCase("all")){
                for(String attachment : emailAttachments){
                    if(attachment.toLowerCase().contains(required)){
                        requiredEmails += jsonEmailConverter.emailToJsonString(email) + ",";
                        continue;
                    }
                }
            }

        }
        return requiredEmails;
    }
}
