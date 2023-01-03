package com.example.mailserver.Logic.operationsHandlers;

import java.util.HashMap;
import java.util.Queue;

import com.example.mailserver.Logic.Email;
import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.Folders.Folder;
import com.example.mailserver.Logic.Folders.FoldersMap;
import com.example.mailserver.Logic.Folders.TrashFolder;
//change
public class EmailHandler {
    private FoldersMap foldersMap;
    private FilesHandler filesHandler;

    public EmailHandler(FoldersMap foldersMap, FilesHandler filesHandler){
        this.foldersMap = foldersMap;
        this.filesHandler = filesHandler;
    }

    public void sendEmail(Email email){
        this.foldersMap.getFolder("sent").appendEmail(email);

        Queue<String> receivers = email.cloneReceivers();
        int size = receivers.size();
        for(int i=0; i < size; i++){
            String receiver = receivers.poll();
            String receiverInboxPath = System.getProperty("user.dir") + "/mailserver/Database/Users/"+receiver+"/inbox.json";
            this.sendToReceivers(receiverInboxPath, email);
        }
    }

    public void moveToDraft(Email email){
        this.foldersMap.getFolder("draft").appendEmail(email);
    }

    private void sendToReceivers(String receiverInboxPath, Email email){
        String receiverInboxJson = filesHandler.readFile(receiverInboxPath);
        HashMap<String, Email> receiverInboxEmails = JsonEmailConverter.getInstance().jsonToEmailMap(receiverInboxJson);
        receiverInboxEmails.put(email.getId(), email);
        filesHandler.writeFileFromMap(receiverInboxPath, receiverInboxEmails);
    }

    public boolean moveEmail(String emailId, String sourceFolderName, String distFolderName){
        if(!foldersMap.hasFolder(sourceFolderName)) return false;
        if(!foldersMap.hasFolder(distFolderName)) return false;

        Email emailToBeMoved = foldersMap.getFolder(sourceFolderName).deleteEmail(emailId);
        foldersMap.getFolder(distFolderName).appendEmail(emailToBeMoved);
        return true;
    }

    public void deleteEmail(String emailId, String folderName){
        moveEmail(emailId, folderName, "trash");
    }

    public void deleteEmailForever(String emailId){
        Folder trash = foldersMap.getFolder("trash");
        trash.deleteForever(emailId);
    }
}