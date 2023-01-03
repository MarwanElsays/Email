package com.example.mailserver.Logic;

import java.io.IOException;

import com.example.mailserver.Logic.Filter.Filter;
import com.example.mailserver.Logic.Filter.Search;
import com.example.mailserver.Logic.Folders.FoldersMap;
import com.example.mailserver.Logic.Sort.SortHandler;
import com.example.mailserver.Logic.operationsHandlers.ContactHandler;
import com.example.mailserver.Logic.operationsHandlers.EmailHandler;
import com.example.mailserver.Logic.operationsHandlers.FilesHandler;
import com.example.mailserver.Logic.operationsHandlers.FolderHandler;

//change
public class User {

    private FoldersMap foldersMap;
    private FilesHandler filesHandler;
    private FolderHandler folderHandler;
    private EmailHandler emailHandler;
    private SortHandler sortHandler;
    private ContactHandler contactHandler;
    private Search search;
    private Filter filter;
    private String emailAddress;

    public User(String emailAddress){
        this.foldersMap = new FoldersMap();
        this.filesHandler = new FilesHandler();
        this.contactHandler = new ContactHandler(emailAddress);
        this.sortHandler = new SortHandler();
        this.folderHandler = new FolderHandler(foldersMap, emailAddress, filesHandler, sortHandler);
        this.emailHandler = new EmailHandler(foldersMap, filesHandler);
        this.search = new Search(foldersMap, folderHandler);
        this.filter = new Filter(foldersMap);
        this.emailAddress = emailAddress;
        
        folderHandler.createExistingFolders();
    }
    public String getUserEmailAddress(){
        return emailAddress;
    }
    //email
    public void sendEmail(Email email){
        emailHandler.sendEmail(email);
    }

    public void moveEmailToDraft(Email email){
        emailHandler.moveToDraft(email);
    }

    public void deleteEmail(String emailId, String folderName){
        emailHandler.deleteEmail(emailId, folderName);
    }

    public void deleteEmailForEver(String emailId){
        emailHandler.deleteEmailForever(emailId);
    }

    public boolean moveEmail(String emailId, String sourceFolderName, String distFolderName){
        return emailHandler.moveEmail(emailId, sourceFolderName, distFolderName);
    }
    //folders
    public boolean createNewCustomFolder(String folderName) throws IOException {
        return folderHandler.createNewCustomFolder(folderName);
    }

    public boolean deleteCustomFolder(String folderName){
        return folderHandler.deleteFolder(folderName);
    }

    public boolean renameCustomFolder(String oldFolderName, String newFolderName) throws IOException {
        return folderHandler.renameFolder(oldFolderName, newFolderName);
    }
    
    public String[] getAllCustomFolders(){
        return folderHandler.getExistingCustomFolderNames();
    }

    public int getFolderEmailNumber(String folderName){
        return foldersMap.getFolder(folderName).getEmailsNumber();
    }
    //view emails
    public Email[] getAllEmailsAsArrayFrom(String folderName){
        return foldersMap.getFolder(folderName).getAllEmailsArray();
    }
    public Email[] getEmailsList(String folderName, int sortType, int sortIdntifier, int start){
        return folderHandler.getSubArrayOfEmails(folderName, sortType, sortIdntifier, start);
    }
    //search and filter
    public String searchFile(String required, String fileName, String criteria){
        return search.searchFile(required, fileName, criteria);
    }
    public String searchAllFiles(String required, String criteria){
        return search.searchAllFiles(required, criteria);
    }
    public String filterFile(String required, String fileName, String criteria){
        return filter.filterFile(required, fileName, criteria);
    }

    //sorting
    public Email[] sortEmails(String folderName, int sortType, int sortIdntifier){
        Email[] allEmails = getAllEmailsAsArrayFrom(folderName);
        return sortHandler.sortEmails(allEmails, sortType, sortIdntifier);
    }

    //contacts
    public String addNewContact(String contactName, String[] emailAddresses) throws IOException {
        return contactHandler.addContact(contactName, emailAddresses);
    }

    public String editContactName(String oldContactName, String newContactName) {
        return contactHandler.editContactName(oldContactName, newContactName);
    }

    public String editContactEmails(String contactName, String[] emailAddresses) throws IOException {
        return contactHandler.editContactEmails(contactName, emailAddresses);
    }

    public String deleteContact(String contactName) throws IOException {
        return contactHandler.deleteContact(contactName);
    }

    public String getContacts() throws IOException {
        return contactHandler.getAllContacts();
    }
}