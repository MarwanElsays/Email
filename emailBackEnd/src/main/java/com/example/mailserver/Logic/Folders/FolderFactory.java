package com.example.mailserver.Logic.Folders;
//change
public class FolderFactory {
    private static FolderFactory instance;

    private FolderFactory(){}

    public static FolderFactory getInstance(){
        if(instance == null) instance = new FolderFactory();
        return instance;
    }

    public Folder createFolder(String type, String fileName, String userEmail){
        if(type.equals("trash")) return new TrashFolder(fileName, true, userEmail);
        else if(type.equals("custom")) return new Folder(fileName, false, userEmail);
        else return new Folder(fileName, true, userEmail);
    }
}