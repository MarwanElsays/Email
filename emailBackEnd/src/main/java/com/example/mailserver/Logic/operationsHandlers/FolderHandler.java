package com.example.mailserver.Logic.operationsHandlers;

import com.example.mailserver.Logic.Email;
import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.Folders.Folder;
import com.example.mailserver.Logic.Folders.FolderFactory;
import com.example.mailserver.Logic.Folders.FoldersMap;
import com.example.mailserver.Logic.Sort.SortHandler;

import javax.imageio.IIOException;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
//change
public class FolderHandler {
    private FilesHandler fileHandler;
    private FoldersMap foldersMap;
    private String userEmail;
    private SortHandler sortHandler;

    public FolderHandler(FoldersMap foldersMap, String userEmail, FilesHandler filesHandler, SortHandler sortHandler){
        this.fileHandler = filesHandler;
        this.foldersMap = foldersMap;
        this.userEmail = userEmail;
        this.sortHandler = sortHandler;
    }

    private void createSystemFolder(String folderName){
        Folder newSystemFolder = FolderFactory.getInstance().createFolder("system", folderName, userEmail);
        newSystemFolder.setFilesHandler(fileHandler);
        foldersMap.addFolder(folderName, newSystemFolder);
    }
    
    private void createExistingCustomFolder(String folderName){
        Folder newCustomFolder = FolderFactory.getInstance().createFolder("custom", folderName, userEmail);
        newCustomFolder.setFilesHandler(fileHandler);
        foldersMap.addFolder(folderName, newCustomFolder);
    }

    public void createExistingFolders(){
        //create system folders
        String[] systemFoldersNames = {"inbox", "sent", "draft", "trash"};
        for (String folderName: systemFoldersNames){
            createSystemFolder(folderName);
        }
        //creating existing custom folders
        String[] existingFolderNames = getExistingCustomFolderNames();
        if(existingFolderNames != null){
            for(String folderName: existingFolderNames){
                createExistingCustomFolder(folderName.toLowerCase());
            }
        }
    }

    public boolean createNewCustomFolder(String folderName) throws IOException {
        if(foldersMap.hasFolder(folderName)) return false;
        File newCustomFolder = new File(getFolderPath(folderName));
        try{
            newCustomFolder.createNewFile();
        }
        catch (IIOException e){
            e.printStackTrace();
        }

        String[] existingCustomFolderNames = getExistingCustomFolderNames();
        String[] newCustomFoldersNames;
        String foldersFilePath = System.getProperty("user.dir") + "/mailserver/Database/Users/" + userEmail + "/folders.json";;
        if(existingCustomFolderNames == null){
            newCustomFoldersNames = new String[1];
        }else{
            newCustomFoldersNames = Arrays.copyOf(existingCustomFolderNames, existingCustomFolderNames.length+1);
        }
        newCustomFoldersNames[newCustomFoldersNames.length - 1] = folderName;
        fileHandler.writeFileFromArray(foldersFilePath, newCustomFoldersNames);

        createExistingCustomFolder(folderName);
        return true;
    }

    public boolean deleteFolder(String folderName){
        if(foldersMap.getFolder(folderName).isImmutable()) return false;
        File myFile = new File(getFolderPath(folderName));
        boolean success = myFile.delete();
        if(!success) return false;
        foldersMap.deleteFolder(folderName);

        String[] existingCustomFolderNames = getExistingCustomFolderNames();
        String[] modifiedCustomFoldersNames = new String[existingCustomFolderNames.length -1];
        int index = 0;

        for(int i = 0; i < existingCustomFolderNames.length; i++){
            if(existingCustomFolderNames[i].equals(folderName)) continue;
            modifiedCustomFoldersNames[index++] = existingCustomFolderNames[i];
        }
        String foldersFilePath = System.getProperty("user.dir") + "/mailserver/Database/Users/" + userEmail + "/folders.json";;
        fileHandler.writeFileFromArray(foldersFilePath, modifiedCustomFoldersNames);
        return true;
    }

    public boolean renameFolder(String oldFolderName, String newFolderName) throws IOException {
        if(!foldersMap.hasFolder(oldFolderName)) return false;
        Folder oldFolder = foldersMap.getFolder(oldFolderName);
        if(oldFolder == null || oldFolder.isImmutable()) return false;
        if(foldersMap.hasFolder(newFolderName)) return false;

        Folder folder = foldersMap.getFolder(oldFolderName);
        foldersMap.addFolder(newFolderName, folder);
        foldersMap.deleteFolder(oldFolderName);

        File oldFile = new File(getFolderPath(oldFolderName));
        File newFile = new File(getFolderPath(newFolderName));

        if (newFile.exists()) throw new java.io.IOException("file exists");
        boolean success =  oldFile.renameTo(newFile);
        if(!success) return false;

        oldFolder.setFileName(newFolderName);

        String[] existingCustomFolderNames = getExistingCustomFolderNames();

        for(int i = 0; i < existingCustomFolderNames.length; i++){
            if(existingCustomFolderNames[i].equals(oldFolderName)){
                existingCustomFolderNames[i] = newFolderName;
                break;
            }
        }
        String foldersFilePath = System.getProperty("user.dir") + "/mailserver/Database/Users/" + userEmail + "/folders.json";;
        fileHandler.writeFileFromArray(foldersFilePath, existingCustomFolderNames);
        return true;
    }

    public Email[] getSubArrayOfEmails(String folderName, int sortType, int sortIdntifier, int start){
        //0 priority //1 date
        //0 newer first 1 older first
        System.out.println(foldersMap.getFolder(folderName));
        Email[] allEmails = foldersMap.getFolder(folderName).getAllEmailsArray();
        System.out.println("hello");
        Email[] sortedEmails = sortHandler.sortEmails(allEmails, sortType, sortIdntifier);

        if(start < 0) start = 0;
        // if(start > sortedEmails.length) start = sortedEmails.length - 10;

        int endIndex = start + 15;
        if(endIndex > sortedEmails.length) endIndex = sortedEmails.length;
        System.out.println(start + " : " + endIndex);;
        ArrayList<Email> outputEmails = new ArrayList<>();
        for(int i = start; i < endIndex; i++){
            outputEmails.add(sortedEmails[i]);
        }
        return outputEmails.toArray(new Email[outputEmails.size()]);
    }

    private String getFolderPath(String folderName){
        return System.getProperty("user.dir") + "/mailserver/Database/Users/" + userEmail + "/" + folderName + ".json";
    }

    public String[] getExistingCustomFolderNames(){
        String existingCustomFoldersPath = System.getProperty("user.dir") + "/mailserver/Database/Users/" + userEmail + "/folders.json";
        String existingCustomFoldersNamesStr = fileHandler.readFile(existingCustomFoldersPath);
        return JsonEmailConverter.getInstance().jsonArrayToStringArray(existingCustomFoldersNamesStr);
    }
}