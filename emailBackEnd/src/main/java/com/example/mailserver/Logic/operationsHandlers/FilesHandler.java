package com.example.mailserver.Logic.operationsHandlers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Scanner;

import com.example.mailserver.Logic.Email;
import com.example.mailserver.Logic.JsonEmailConverter;
//change
public class FilesHandler {        

    public String readFile(String path){
        StringBuilder emailsInJson = new StringBuilder();
        try{
            File myObj = new File(path);
            Scanner reader = new Scanner(myObj);
            while(reader.hasNextLine()) emailsInJson.append(reader.nextLine());
            reader.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return emailsInJson.toString();
    }
    public void writeFileFromArray(String path, Email[] emails){
        String emailsString = JsonEmailConverter.getInstance().arrayOfEmailsToJson(emails);
        writeFile(path, emailsString);
    }

    public void writeFileFromArray(String path, String[] emails){
        String emailsString = JsonEmailConverter.getInstance().stringArrayToJson(emails);
        writeFile(path, emailsString);
    }
    public void writeFileFromMap(String path, HashMap<String, Email> emails){
        String emailsString = JsonEmailConverter.getInstance().mapOfEmailsToJson(emails);
        writeFile(path, emailsString);
    }
    private void writeFile(String path, String content){
        try{
            FileWriter writer = new FileWriter(path);
            writer.write(content);
            writer.close();
        }catch(IOException e){
            e.printStackTrace();
        }
    }
}