package com.example.mailserver.Logic.Folders;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;

import com.example.mailserver.Logic.Email;
import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.operationsHandlers.FilesHandler;
//change
public class Folder {
    private String id;
    private boolean isImmutable;
    private String folderPath = System.getProperty("user.dir") + "/mailserver/Database/Users/";
    private FilesHandler filesHandler;
    private String userEmail;
    private HashMap<String, Email> allEmails = null;

    public Folder(String folderName, boolean isImmutable, String userEmail){
        this.id = folderName;
        this.isImmutable = isImmutable;
        this.userEmail = userEmail;
        this.folderPath += (userEmail + "/" + folderName +".json");
    }

    public void setFilesHandler(FilesHandler filesHandler){
        this.filesHandler = filesHandler;
    }

    public boolean isImmutable(){return isImmutable;}

    public void setFileName(String folderName){
        this.id = folderName;
        this.folderPath = System.getProperty("user.dir") + "/mailserver/Database/Users/";
        this.folderPath += (userEmail + "/" + folderName +".json");
    }

    public String getFileName() {return id;}
    public String getUserEmail() {return userEmail;}

    public Email[] getAllEmailsArray(){
        HashMap<String, Email> tempEmailsMap = getAllEmailsMap();
        return tempEmailsMap.values().toArray(new Email[tempEmailsMap.size()]);
    }

    private HashMap<String, Email> getAllEmailsMap(){
        if(allEmails != null) return allEmails;
        String emailsJsonStr = filesHandler.readFile(folderPath);
        allEmails = JsonEmailConverter.getInstance().jsonToEmailMap(emailsJsonStr);
        return allEmails;
    }

    public int getEmailsNumber(){
        return getAllEmailsMap().size();
    }

    public void appendEmail(Email email){
               //
               System.out.println("append");
               System.out.println(email);
               //
        getAllEmailsMap().put(email.getId(), email);
        refreshFolder();
    }

    public Email deleteEmail(String id){
        Email deletedEmail = getAllEmailsMap().remove(id);
        refreshFolder();
        return deletedEmail;
    }

    private void refreshFolder(){
        filesHandler.writeFileFromMap(folderPath, allEmails);
    }

    public void deleteForever(String emailId){
        Email deletedEmail = deleteEmail(emailId);
        String userEmail = getUserEmail();
        deleteRelatedAttachments(deletedEmail.getId(), userEmail);
    }

    private void deleteRelatedAttachments(String emailId, String emailAddress){
        Path path = Paths.get("mailserver/Database/Users/" + emailAddress + "/Attachments/" + emailId);
        if(!path.toFile().exists()) return;
        File folder = new File("mailserver/Database/Users/" + emailAddress + "/Attachments/" + emailId);
        String files[] = folder.list();
        for(String file : files){
            File currentFile = new File(folder.getPath(), file);
            currentFile.delete();
        }
        folder.delete();
    }
}