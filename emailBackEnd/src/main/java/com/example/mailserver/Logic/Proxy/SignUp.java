package com.example.mailserver.Logic.Proxy;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Scanner;

import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.Session;
import com.example.mailserver.Logic.User;

public class SignUp {
  private static SignUp instance;

  private SignUp(){}

  public static SignUp getInstance(){
      if(instance == null) instance = new SignUp();
      return instance;
  }

    JsonEmailConverter jsonEmailConverter = JsonEmailConverter.getInstance();

    public String signUpUser(String emailAddress, String password){
      emailAddress = emailAddress.toLowerCase();
      UserInfo[] usersInfo = readUsersFile();
      if(!SignIn.getInstance().signInUser(emailAddress, password).equals("false")) return "false";
      createUser(emailAddress, password, usersInfo);
      return Session.getInstance().addUserSession(new User(emailAddress)).toString();
    }

    //get all users in database
    public UserInfo[] readUsersFile(){
      String jsonStr = "";
      try {
          File myObj = new File("mailserver/Database/users.json");
          Scanner myReader = new Scanner(myObj);
          while (myReader.hasNextLine()) {
            jsonStr += myReader.nextLine();
          }
          myReader.close();
        } catch (FileNotFoundException e) {
          System.out.println("An error occurred.");
          e.printStackTrace();
        }
        return jsonEmailConverter.jsonToUserInfo(jsonStr);
    }

    //creation
    private void createUser(String emailAddress, String password,UserInfo[] usersInfo){
      String[] fileNames = {"inbox", "sent", "draft", "contacts", "trash", "folders"};
      //create user folder
      try {
        Path path = Paths.get("mailserver/Database/Users/"+emailAddress);
        Files.createDirectories(path);
        Path path2 = Paths.get("mailserver/Database/Users/"+emailAddress+"/Attachments");
        Files.createDirectories(path2);
      } 
      catch (IOException e) {
        System.err.println("Failed to create directory!" + e.getMessage());
      }

      for(String fileName: fileNames){
        createSubFile(emailAddress, fileName);
      }
        
      UserInfo userInfo = new UserInfo(emailAddress, password);
      usersInfo = Arrays.copyOf(usersInfo, usersInfo.length + 1);
      usersInfo[usersInfo.length-1] = userInfo;

      String jsonStr = jsonEmailConverter.arrayOfUserInfoToJson(usersInfo);
      writeUsersFile(jsonStr);
    }

    private void writeUsersFile(String jsonStr){
      try {
        FileWriter myWriter = new FileWriter("mailserver/Database/users.json");
        myWriter.write(jsonStr);
        myWriter.close();
      } catch (IOException e) {
        System.out.println("An error occurred.");
        e.printStackTrace();
      }
    }

    private void createSubFile(String emailAddress, String fileName){
      File subFile= new File("mailserver/Database/Users/"+emailAddress+"/"+fileName+".json");
      try {
        subFile.createNewFile();
        if(fileName.equals("contacts")){
          FileWriter fileWriter = new FileWriter(subFile);
          fileWriter.write("[]");
          fileWriter.close();
        }
      } 
      catch (IOException e) {
        e.printStackTrace();
      }
    }
}
