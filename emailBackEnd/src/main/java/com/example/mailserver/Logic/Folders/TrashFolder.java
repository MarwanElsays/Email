package com.example.mailserver.Logic.Folders;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.example.mailserver.Logic.Email;

//change
public class TrashFolder extends Folder {

    public TrashFolder(String fileName, boolean isImmutable, String userEmail) {
        super(fileName, isImmutable, userEmail);
        checkForOutDatedEmail();
    }

    private void checkForOutDatedEmail(){
        Email[] allEmails = getAllEmailsArray();
        for(Email email : allEmails){
            if(monthPassed(email)){
                deleteForever(email.getId());
            }
        }

    }
    
    private boolean monthPassed(Email email){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        String timeNow = String.valueOf(dtf.format(now));
        String timeEmail = email.getTime();

        boolean monthPassed = false;
        boolean yearPassed = false;

        //for years

        int holderNow = Integer.parseInt(timeNow.substring(0, 4));
        int holderEmail = Integer.parseInt(timeEmail.substring(0, 4));
        if(holderNow - holderEmail == 1) yearPassed = true;
        else if(holderNow - holderEmail > 1) return true; // if user doesn't open his email for more than a year

        holderNow = Integer.parseInt(timeNow.substring(5, 7));
        holderEmail = Integer.parseInt(timeEmail.substring(5, 7));

        //for months

        if(yearPassed)
        {
            if(holderNow != 1 && holderEmail != 12) return true; // to check for (xyz0/12 and xyz1/01)
            else monthPassed = true;
        }

        if(holderNow - holderEmail == 1) monthPassed = true;
        else if(holderNow - holderEmail > 1) return true; // if the difference is more than one month

        holderNow = Integer.parseInt(timeNow.substring(8, 10));
        holderEmail = Integer.parseInt(timeEmail.substring(8, 10));

        //for days

        if(monthPassed && (holderNow >= holderEmail)) return true;

        return false;
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