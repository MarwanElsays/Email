package com.example.mailserver.Logic.operationsHandlers;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Scanner;

import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.Contacts.Contact;

public class ContactHandler {

    JsonEmailConverter jsonConverter = JsonEmailConverter.getInstance();

    private String userEmail;

    public ContactHandler(String userEmail){
        this.userEmail = userEmail;
    }
    //every function here will return the json file for viewing purposes

    public String addContact(String contactName, String[] emailAddresses){
        Contact contact = new Contact(contactName, emailAddresses);

        //read contacts here
        Contact[] allContacts = readContactsFile();
        //
        //check if name already exists here: return null if true
        for(Contact tempContact : allContacts){
            if(tempContact.getContactName().equals(contactName)){
                return null;
            }
        }
        //
        //add contact here
        allContacts = Arrays.copyOf(allContacts, allContacts.length + 1);
        allContacts[allContacts.length-1] = contact;
        //
        //convert all to json str and write to file here
        String jsonStr = jsonConverter.arrayOfContactsToJson(allContacts);
        writeContactsFile(jsonStr);
        //
        //return the previously mentioned json string
        return jsonStr;
    }

    public String editContactEmails(String contactName, String[] emailAddresses){
        Contact[] allContacts = readContactsFile();
        for(int i=0; i<allContacts.length; i++){
            if(allContacts[i].getContactName().equals(contactName)){
                allContacts[i].setEmailAddresses(emailAddresses);
                break;
            }
        }
        String jsonStr = jsonConverter.arrayOfContactsToJson(allContacts);
        writeContactsFile(jsonStr);
        return jsonStr;
    }

    public String getAllContacts(){
        Contact[] allContacts = readContactsFile();
        String jsonStr = jsonConverter.arrayOfContactsToJson(allContacts);
        return jsonStr;
    }

    public String editContactName(String oldContactName, String newContactName){
        Contact[] allContacts = readContactsFile();
        for(int i=0; i<allContacts.length; i++){
            if(allContacts[i].getContactName().equals(oldContactName)){
                allContacts[i].setContactName(newContactName);
                break;
            }
        }
        String jsonStr = jsonConverter.arrayOfContactsToJson(allContacts);
        writeContactsFile(jsonStr);
        return jsonStr;
    }

    public String deleteContact(String contactName){
        Contact[] allContacts = readContactsFile();
        Contact[] newContacts = new Contact[allContacts.length-1];
        int indexOld = 0;
        int indexNew = 0;
        while(indexOld < allContacts.length){
            if(allContacts[indexOld].getContactName().equals(contactName)){
                indexOld++;
                continue;
            }
            newContacts[indexNew++] = allContacts[indexOld++];
        }

        String jsonStr = jsonConverter.arrayOfContactsToJson(newContacts);
        writeContactsFile(jsonStr);
        return jsonStr;
    }

    // Utilities
    private Contact[] readContactsFile(){
        String jsonStr = "";
        try {
            File myObj = new File("mailserver/Database/Users/" + userEmail + "/contacts.json");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
              jsonStr += myReader.nextLine();
            }
            myReader.close();
          } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
          }
          return jsonConverter.jsonToContact(jsonStr);
    }
    private void writeContactsFile(String jsonStr){
        try {
          FileWriter myWriter = new FileWriter("mailserver/Database/Users/" + userEmail + "/contacts.json");
          myWriter.write(jsonStr);
          myWriter.close();
        } catch (IOException e) {
          System.out.println("An error occurred.");
          e.printStackTrace();
        }
    }
}
